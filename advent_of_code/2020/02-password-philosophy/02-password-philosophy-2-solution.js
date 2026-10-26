const { parseLine, solution } = require('./02-password-philosophy-1-solution')

/**
 * takes in a raw line of puzzle text, returning a boolean value indicating
 * whether the given password meets the given rule.
 * @param {*} rawLine a raw line of puzzle text, eg '1-3 a: abcde'
 */
function isPasswordValid(rawLine) {
    const { password, char, min, max } = parseLine(rawLine)

    return (password[min - 1] === char) !== (password[max - 1] === char)
}

function pt2Solution(inputArray) {
    return solution(inputArray, isPasswordValid)
}

module.exports = pt2Solution
