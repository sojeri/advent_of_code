//
/**
 * 1 becomes 11 (1 copy of digit 1).
 * 11 becomes 21 (2 copies of digit 1).
 * 21 becomes 1211 (one 2 followed by one 1).
 * 1211 becomes 111221 (one 1, one 2, and two 1s).
 * 111221 becomes 312211 (three 1s, two 2s, and one 1).
 */

function findLookSay(value) {
    const output = []
    let lastChar = value[0]
    let lastCharCount = 1

    for (let c = 1; c < value.length; c++) {
        const char = value[c]
        if (char === lastChar) {
            lastCharCount++
            continue
        }

        output.push(lastCharCount)
        output.push(lastChar)
        lastChar = char
        lastCharCount = 1
    }

    output.push(lastCharCount)
    output.push(lastChar)

    return output
}

function looper(input, iterations = 40, debug = false) {
    let iterationsCount = 0
    let currentValue = input.split('').map(s => Number(s))
    while (iterationsCount < iterations) {
        currentValue = findLookSay(currentValue)
        if (debug) {
            console.log('iteration', iterationsCount, '\nresult length', currentValue)
        }
        iterationsCount++
    }

    return currentValue
}

function solution(input, iterations = 40, debug = false) {
    return looper(input, iterations, debug).length
}

module.exports = {
    solution,
    looper,
    findLookSay,
}
