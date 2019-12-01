const fs = require('fs')

function getValueAsNumber(string) {
    return Number(string)
}

function findFirstRecurringFrequency(string) {
    let array = string.split('\n')
    let knownFrequencies = {}
    let result
    let currentFrequency = 0
    knownFrequencies[0] = true

    let i = 0
    while (result == undefined) {
        i = i % array.length

        let val = getValueAsNumber(array[i])
        currentFrequency += val

        if (knownFrequencies[currentFrequency]) {
            result = currentFrequency
        } else {
            knownFrequencies[currentFrequency] = true
        }

        i++
    }

    return result
}

function findFirstRecurringFrequencyFromFile(file) {
    let fileContents = fs.readFileSync(file)
    return findFirstRecurringFrequency(fileContents.toString())
}

module.exports = {
    findFirstRecurringFrequency: findFirstRecurringFrequency,
    findFirstRecurringFrequencyFromFile: findFirstRecurringFrequencyFromFile,
}
