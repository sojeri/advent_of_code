#!/usr/bin/env node

const scaffoldCurrentDirectory = require('./scaffoldCurrentDirectory')

const exampleCommand = '`yarn new 2017 01`'
const exampleCommandWithPlaceholders = '`yarn new <year> <day>'

function createScaffold() {
    let args = process.argv.slice(2)
    if (args.length < 2) {
        console.log('You can use this command to scaffold a new directory:')
        console.log(`    ${exampleCommandWithPlaceholders}`)
        console.log(`    eg, ${exampleCommand}`)

        return
    }

    let aocYear = args[0]
    let aocDay = args[1]

    validateNumberRange(aocYear, 'year', 2015, 2100)
    validateNumberRange(aocDay, 'day', 1, 25)

    if (aocDay.length < 2) {
        aocDay = `0${aocDay}`
    }

    scaffoldCurrentDirectory(`${aocYear}/${aocDay}/${aocDay}`)
}

function validateNumberRange(value, valueName, min, max) {
    if (Number(value) == NaN) {
        throw new Error(`
            yarn new should be called with a numeric ${valueName} value
            eg '${exampleCommand}' (${exampleCommandWithPlaceholders})`)
    }

    value = Number(value)
    if (value > max) {
        throw new Error(`${valueName} ${value} is greater than maximum ${max}`)
    }
    if (value < min) {
        throw new Error(`${valueName} ${value} is less than minimum ${min}`)
    }
}

createScaffold()
