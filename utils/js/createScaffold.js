#!/usr/bin/env node

const scaffoldCurrentDirectory = require('./scaffoldCurrentDirectory')
const { getLogger, VERBOSITY } = require('./getLogger')

const logger = getLogger('utils/new :: ', VERBOSITY.INFO)
const exampleCommandWithPlaceholders =
    'yarn new [advent/everybody/project/sandbox] <year> <day> [optional extra words for directory name]'
const exampleCommandAoc = '`yarn new advent 2017 20 find shortest path`'
const outputFilesAoc = [
    'advent_of_code/2017/20-find-shortest-path/20-1-solution.js',
    'advent_of_code/2017/20-find-shortest-path/20-1-test.js',
    'advent_of_code/2017/20-find-shortest-path/20-2-solution.js',
    'advent_of_code/2017/20-find-shortest-path/20-2-test.js',
    'advent_of_code/2017/20-find-shortest-path/example.txt',
    'advent_of_code/2017/20-find-shortest-path/input.txt',
]
const exampleCommandEbc = '`yarn new everybody 2024 1 battle for farmlands`'
const outputFilesEbc = [
    '(similar to AoC files, plus the below)',
    'everybody_codes/2024/01-battle-for-farmlands/01-3-solution.js',
    'everybody_codes/2024/01-battle-for-farmlands/01-3-test.js',
]
const exampleSandboxCommand = '`yarn new sandbox 14 find best stock sale`'
const exampleEulerCommand = '`yarn new project-euler 5 smallest multiple`'
const exampleLeetcodeCommand = '`yarn new leetcode 3 longest substring without repeating characters`'

/**
 * converts CLI arg to folder name.
 * defaults to original repo scaffold behavior -- advent of code.
 */
function sanitizeWat(watArg) {
    if (watArg[0] == 's') return { wat: 'sandbox', puzzleParts: 1 }
    if (watArg[0] == 'p') return { wat: 'project_euler', puzzleParts: 1 }
    if (watArg[0] == 'e') return { wat: 'everybody_codes', puzzleParts: 3 }
    if (watArg[0] == 'l') return { wat: 'leetcode', puzzleParts: 1 }
    return { wat: 'advent_of_code', puzzleParts: 2 }
}

/** flag for special handling for puzzles that aren't on a year-based release schedule */
function isNoYearWat(watArg) {
    if (typeof watArg !== 'string') return false
    const marker = watArg[0]
    return marker == 's' || marker == 'p' || marker == 'l'
}

/**
 * createScaffold is the target of the `yarn new` script. It parses the CLI args, and
 * scaffolds a directory based on said inputs. Since folks will run this util
 * on their own file systems, the various errors thrown are more about coaching
 * the user to expected behavior. There are no security checks.
 */
function createScaffold() {
    let args = process.argv.slice(2)
    const hasntYear = isNoYearWat(args[0])
    const size = hasntYear ? 2 : 3
    if (args.length < size || args[size - 1] === undefined) {
        logger.log('To run tests:\n')
        logger.log('    `yarn test` for simple output\n')
        logger.log('    `yarn test:verbose` for full test spec\n')

        logger.log('You can use this command to scaffold a new directory:\n')
        logger.log(`    ${exampleCommandWithPlaceholders}\n`)
        logger.log(`eg, ${exampleCommandAoc} would scaffold the following files:\n`)
        outputFilesAoc.forEach(o => {
            logger.log(`    * ${o}`)
        })
        logger.log()
        logger.log(`eg, ${exampleCommandEbc} would scaffold the following files:\n`)
        outputFilesEbc.forEach(o => {
            logger.log(`    * ${o}`)
        })
        logger.log()
        logger.log('If you want a project euler, leetcode, or sandbox directory:\n')
        logger.log(`eg, ${exampleSandboxCommand}\n`)
        logger.log(`OR ${exampleLeetcodeCommand}\n`)
        logger.log(`OR ${exampleEulerCommand}\n`)
        logger.log('Current wat logic is based on first character, so you can just use a/e/p/s if you prefer.\n')
        return
    }

    const { wat, puzzleParts } = sanitizeWat(args[0])
    let aocYear = args[1]
    let aocDay = args[2]
    if (hasntYear) {
        aocDay = aocYear
        validateNumberRange(aocDay, `${wat} #`, 1, 9999)
        while (aocDay.length < 4) {
            aocDay = `0${aocDay}` // convert 14 to 014
        }
    } else {
        validateNumberRange(aocYear, 'year', 2000, 2100)
        validateNumberRange(aocDay, 'day', 1, 25)

        if (aocDay.length < 2) {
            aocDay = `0${aocDay}`
        }
    }

    let aocDayDir = `${aocDay}`
    args = args.slice(size)
    if (args.length > 0) {
        args = args.map(a => {
            return getSupportedCharsFromWord(a)
        })
        aocDayDir += '-'
        aocDayDir += args.join('-')
    }

    scaffoldCurrentDirectory({ wat, aocYear, aocDayDir, aocDay, hasntYear, puzzleParts })
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
