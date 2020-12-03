#!/usr/bin/env node

const scaffoldCurrentDirectory = require('./scaffoldCurrentDirectory')

const exampleCommandWithPlaceholders = 'yarn new <year> <day> [optional extra words for directory name]'
const exampleCommand = '`yarn new 2017 01 find shortest path`'
const outputFiles = [
  '2017/01-find-shortest-path/01-solution.js',
  '2017/01-find-shortest-path/01-test.js',
  '2017/01-find-shortest-path/02-solution.js',
  '2017/01-find-shortest-path/02-test.js',
  '2017/01-find-shortest-path/example.txt',
  '2017/01-find-shortest-path/input.txt'
]

function createScaffold() {
    let args = process.argv.slice(2)
    if (args.length < 2) {
        console.log('You can use this command to scaffold a new directory:\n')
        console.log(`    ${exampleCommandWithPlaceholders}\n`)
        console.log(`eg, ${exampleCommand} would scaffold the following files:\n`)
        outputFiles.forEach(o => { console.log(`    * ${o}`) })
        console.log('\n')
        return
    }

    let aocYear = args[0]
    let aocDay = args[1]
    let aocDayDir = `${aocDay}`

    validateNumberRange(aocYear, 'year', 2015, 2100)
    validateNumberRange(aocDay, 'day', 1, 25)

    if (aocDay.length < 2) {
        aocDay = `0${aocDay}`
    }

    args = args.slice(2)
    if (args.length > 0) {
        args = args.map(a => {
            return getSupportedCharsFromWord(a)
        })
        aocDayDir += '-'
        aocDayDir += args.join('-')
    }

    scaffoldCurrentDirectory(`${aocYear}/${aocDayDir}/${aocDay}`)
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

const supportedChars = /[a-zA-Z]+/
function getSupportedCharsFromWord(possibleWord) {
    let word = possibleWord.match(supportedChars)[0]

    if (word.length == 0) {
        throw new Error(`${possibleWord} does not contain any recognized chars [used regex a-zA-Z+ matcher]`)
    }

    return word
}

createScaffold()
