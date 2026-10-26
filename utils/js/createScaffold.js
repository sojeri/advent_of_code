#!/usr/bin/env node

const scaffoldCurrentDirectory = require('./scaffoldCurrentDirectory')

const exampleCommandWithPlaceholders = 'yarn new <wat> <year> <day> [optional extra words for directory name]'
const exampleCommandAoc = '`yarn new advent 2017 1 find shortest path`'
const outputFilesAoc = [
    'advent_of_code/2017/01-find-shortest-path/01-solution.js',
    'advent_of_code/2017/01-find-shortest-path/01-test.js',
    'advent_of_code/2017/01-find-shortest-path/02-solution.js',
    'advent_of_code/2017/01-find-shortest-path/02-test.js',
    'advent_of_code/2017/01-find-shortest-path/example.txt',
    'advent_of_code/2017/01-find-shortest-path/input.txt',
]
const exampleCommandEbc = '`yarn new everybody 2024 1 battle for farmlands`'
const outputFilesEbc = [
    'everybody_codes/2024/01-battle-for-farmlands/01-solution.js',
    'everybody_codes/2024/01-battle-for-farmlands/01-test.js',
    'everybody_codes/2024/01-battle-for-farmlands/02-solution.js',
    'everybody_codes/2024/01-battle-for-farmlands/02-test.js',
    'everybody_codes/2024/01-battle-for-farmlands/example.txt',
    'everybody_codes/2024/01-battle-for-farmlands/input.txt',
]
const exampleSandboxCommand = '`yarn new sandbox 14 find best stock sale`'

/**
 * converts CLI arg to folder name.
 * defaults to original repo scaffold behavior -- advent of code.
 */
function sanitizeWat(watArg) {
    console.error(watArg)
    if (watArg[0] == 's') return 'sandbox'
    if (watArg[0] == 'e') return 'everybody_codes'
    return 'advent_of_code'
}

/**
 * createScaffold is the target of the `yarn new` script. It parses the CLI args, and
 * scaffolds a directory based on said inputs. Since folks will run this util
 * on their own file systems, the various errors thrown are more about coaching
 * the user to expected behavior. There are no security checks.
 */
function createScaffold() {
    let args = process.argv.slice(2)
    const isSandbox = typeof args[0] == 'string' && args[0][0] == 's'
    const size = isSandbox ? 2 : 3 // sandbox doesn't require year
    if (args.length < size || args[size - 1] === undefined) {
        console.log('You can use this command to scaffold a new directory:\n')
        console.log(`    ${exampleCommandWithPlaceholders}\n`)
        console.log(`eg, ${exampleCommandAoc} would scaffold the following files:\n`)
        outputFilesAoc.forEach(o => {
            console.log(`    * ${o}`)
        })
        console.log('\n')
        console.log(`eg, ${exampleCommandEbc} would scaffold the following files:\n`)
        outputFilesEbc.forEach(o => {
            console.log(`    * ${o}`)
        })
        console.log('\n')
        console.log('If you just want a sandbox, you can use sandbox:')
        console.log(`eg, ${exampleSandboxCommand}`)
        console.log('\n')
        console.log('Current wat logic is based on first character, so you can just use a/e/s if you prefer.')
        console.log('\n')
        return
    }

    let wat = sanitizeWat(args[0])
    let aocYear = args[1]
    let aocDay = args[2]
    let wordsStartAt = 3
    if (wat === 'sandbox') {
        aocDay = aocYear
        wordsStartAt = 2
        validateNumberRange(aocDay, 'sandbox #', 1, 999)
        if (aocDay.length < 2) {
            aocDay = `00${aocDay}` // convert 4 to 004
        } else if (aocDay.length < 3) {
            aocDay = `0${aocDay}` // convert 14 to 014
        }
    } else {
        validateNumberRange(aocYear, 'year', 2015, 2100)
        validateNumberRange(aocDay, 'day', 1, 25)

        if (aocDay.length < 2) {
            aocDay = `0${aocDay}`
        }
    }

    let aocDayDir = `${aocDay}`
    args = args.slice(wordsStartAt)
    if (args.length > 0) {
        args = args.map(a => {
            return getSupportedCharsFromWord(a)
        })
        aocDayDir += '-'
        aocDayDir += args.join('-')
    }

    scaffoldCurrentDirectory({ wat, aocYear, aocDayDir, aocDay })
}

/**
 * validateNumberRange is a helper function used to ensure valid numeric input
 * is passed to the scaffold command. It throws various errors depending on how
 * the given input fails the validations.
 * @param {*} value the raw value from the CLI input
 * @param {*} valueName the friendly name / description of the given value
 * @param {*} min the minimum acceptable number
 * @param {*} max the maximum acceptable number
 */
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

/**
 * getSupportedCharsFromWord is used to clean and validate non-numeric CLI input.
 * @param {*} possibleWord a CLI arg which should contain only valid fileName chars
 */
function getSupportedCharsFromWord(possibleWord) {
    let word = possibleWord.match(/[a-zA-Z]+/)[0]

    if (word.length == 0) {
        // that's right! you only get letters. we live in a cruel world.
        throw new Error(`${possibleWord} does not contain any recognized chars [used regex a-zA-Z+ matcher]`)
    }

    return word
}

createScaffold()
