/**
 * parses a raw line of puzzle text into a convenient metadata object
 * @param {*} line a raw line of puzzle text, eg '1-3 a: abcde'
 */
function parseLine(line) {
    const [rule, password] = line.split(': ') // eg, ['1-3 a', 'abcde']
    const [limits, char] = rule.split(' ') // eg, ['1-3', 'a']
    const [min, max] = limits.split('-').map(s => Number(s)) // eg, ['1', '3'] => [1, 3]

    return { password, char, min, max }
}

/**
 * takes in a raw line of puzzle text, returning a boolean value indicating
 * whether the given password meets the given rule.
 * @param {*} rawLine a raw line of puzzle text, eg '1-3 a: abcde'
 */
function isPasswordValid(rawLine) {
    const { password, char, min, max } = parseLine(rawLine)
    const matches = Array.from(password.matchAll(char))
    const matchesCount = matches ? matches.length : 0

    return matchesCount >= min && matchesCount <= max
}

function solution(inputArray, isPasswordValidCb = isPasswordValid) {
    let validPasswordsCount = 0

    inputArray.forEach(inputLine => {
        if (isPasswordValidCb(inputLine)) {
            validPasswordsCount++
        }
    })

    return validPasswordsCount
}

module.exports = {
    solution,
    parseLine,
}
