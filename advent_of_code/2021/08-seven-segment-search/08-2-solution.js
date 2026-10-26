// https://adventofcode.com/2021/day/8#part2

/**
 *
 * @param {*} mysteriousNumbers eg, 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'
 */
function decodeNumbers(mysteriousNumbers) {
    let numbers = []
    let sixNineZero = []
    let twoFiveThree = []

    // decode 1 4 7 8 by unique length
    mysteriousNumbers.split(' ').forEach(rawCode => {
        const code = sanitize(rawCode)
        switch (code.length) {
            case 2:
                numbers[1] = code
                break
            case 3:
                numbers[7] = code
                break
            case 4:
                numbers[4] = code
                break
            case 7:
                numbers[8] = code
                break
            case 6:
                sixNineZero.push(code)
                break
            case 5:
                twoFiveThree.push(code)
                break
            default:
                throw new Error('oh no. how did we get here?')
        }
    })

    const [partOne, partTwo] = numbers[1]
    let twoFive = []
    let nineZero = []
    for (let i = 0; i < 3; i++) {
        // separate 3 from 253 b/c only one containing both 1 code parts
        // eg, ab: 1, cdfbe: 5, gcdfa: 2, fbcad: 3 -- only 3 has both
        let maybeThree = twoFiveThree[i]
        if (maybeThree.indexOf(partOne) > -1 && maybeThree.indexOf(partTwo) > -1) {
            numbers[3] = maybeThree
        } else {
            twoFive.push(maybeThree)
        }

        // separate 6 from 690 b/c only one NOT containing both 1 code parts
        // eg, ab: 1, cdfgeb: 6, cefabd: 9, cagedb: 0 -- only 6 has neither
        let maybeSix = sixNineZero[i]
        if (maybeSix.indexOf(partOne) > -1 && maybeSix.indexOf(partTwo) > -1) {
            nineZero.push(maybeSix)
        } else {
            numbers[6] = maybeSix
        }
    }

    // need the cg from 8 to separate remaining doubles
    // eg acedgfb: 8, dab: 7, eafb: 4
    // subtract 7 dab to get cegf
    // subtract 4 eafb to get cg
    const cg = []
    numbers[8].split('').forEach(char => {
        if (numbers[7].indexOf(char) === -1 && numbers[4].indexOf(char) === -1) {
            cg.push(char)
        }
    })

    // eg, cg VS cdfbe: 5, gcdfa: 2 -- only 2 has both
    const [maybeTwo, maybeFive] = twoFive
    if (maybeTwo.indexOf(cg[0]) > -1 && maybeTwo.indexOf(cg[1]) > -1) {
        numbers[2] = maybeTwo
        numbers[5] = maybeFive
    } else {
        numbers[2] = maybeFive
        numbers[5] = maybeTwo
    }

    // eg, cg VS cefabd: 9, cagedb: 0 -- only 0 has both
    const [maybeNine, maybeZero] = nineZero
    if (maybeZero.indexOf(cg[0]) > -1 && maybeZero.indexOf(cg[1]) > -1) {
        numbers[9] = maybeNine
        numbers[0] = maybeZero
    } else {
        numbers[9] = maybeZero
        numbers[0] = maybeNine
    }

    return numbers
}

/** sanitizes strings to ensure a standard format */
function sanitize(rawString) {
    const letters = rawString.split('')
    return letters.sort().join('')
}

/**
 * 
 * @param {*} line eg, 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf'
 * @returns 
 */
function decodeLine(line) {
    const [codePart, outputPart] = line.split(' | ')
    const dict = decodeNumbers(codePart)
    let strOutput = ''
    outputPart.split(' ').forEach(rawCode => {
        const code = sanitize(rawCode)
        strOutput += dict.indexOf(code)
    })
    return Number(strOutput)
}

function solution(input) {
    let totalOutput = 0
    input.forEach(line => {
        totalOutput += decodeLine(line)
    })
    return totalOutput
}

module.exports = {
    decodeNumbers,
    decodeLine,
    solution,
}
