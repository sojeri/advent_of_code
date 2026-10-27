/**
Build a insurance claim submission payload using 
encounter, patients and providers CSV.

Sample output
[
  {
    "encounter_id": "74478cb2-3102-4836-a4cd-25e7a43d8f5e",
    "patient_id": "b3e29343-9e03-44c7-8181-3695c629415d",
    "patient_demo": {
      "first_name": "Robert",
      "last_name": "Mccall",
      "dob": "1952-06-13",
    },
    "provider_info": {
	    "provider_name": "Dr. Katie Cowan",
	    "provider_npi": "7977261837",
    },
  }
]
*/

// next two lines added after the fact
const { getLogger, VERBOSITY } = require('../../utils/js/getLogger')
const logger = getLogger('sandbox (27) :: ')

// import with fs.readfilesync
// combine data as outlined above
const fs = require('fs')
const { readFileSync } = fs

function getCsvData(fileName) {
    // TODO: support flag for ID => object dictionary output
    const data = fs.readFileSync(fileName, { encoding: 'utf8' })
    const lines = data.split('\n')
    const [headers, ...rows] = lines
    const headerKeys = headers.split(',')
    const output = []
    rows.forEach((row, rowIndex) => {
        const rowValues = row.split(',')
        if (rowValues.length < headerKeys.length) {
            logger.warn('found short line at row', rowIndex, 'in file', fileName)
            return
        }
        const rowOutput = {}
        rowValues.forEach((value, index) => {
            rowOutput[headerKeys[index]] = value
        })
        output.push(rowOutput)
    })
    return output
}

function importData() {
    const providers = getCsvData('./providers.csv')
    const patients = getCsvData('./patients.csv')
    const encounters = getCsvData('./encounters.csv')
    const output = []
    encounters.forEach(encounter => {
        const patientId = encounter.patient_id
        const providerId = encounter.provider_id
        const patient = patients.find(p => p.patient_id === patientId)
        const provider = providers.find(p => p.provider_id === providerId)

        output.push({
            // TODO: move this all into normalizeEncounter
            encounter_id: encounter.encounter_id,
            patient_id: patientId,
            // TODO: move these into normalizePatient/Provider methods
            patient_demo: {
                first_name: patient?.patient_first_name,
                last_name: patient?.patient_last_name,
                dob: patient?.patient_dob,
            },
            provider_info: {
                provider_name: `Dr. ${provider.provider_first_name} ${provider.provider_last_name}`,
                provider_npi: provider.provider_npi,
            },
        })
    })

    return { output, providers, patients, encounters }
}

function validate() {
    // importData
    // is the output the expected structure?
    // expected fields are there, unexpected fields are not
    // no patient or provider found -- call out expected return value
    // validating the behavior of short row
    // getCsvData
    // when no file is found
    // when headers and row values are different lengths
    // when headers and row values match
}

module.exports = {
    importData,
}
