const fs = require('fs')

function getValueAsNumber(string) {
    return Number(string)
}

function parseFrequencyChanges(string) {
    let array = string.split('\n')
    let result = getValueAsNumber(array[0])

    for (let i = 1; i < array.length; i++) {
        let val = getValueAsNumber(array[i])
        result += val
    }

    return result
}

function parseFrequencyChangesFromFile(file) {
    let fileContents = fs.readFileSync(file)
    return parseFrequencyChanges(fileContents.toString())
}

module.exports = {
    parseFrequencyChanges: parseFrequencyChanges,
    parseFrequencyChangesFromFile: parseFrequencyChangesFromFile,
}
