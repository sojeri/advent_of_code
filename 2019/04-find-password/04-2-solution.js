/**
 * an improved isValid checker which runs a couple extra checks the elves remembered.
 * given a password, returns a flag indicating whether it might be the missing password.
 * full spec: https://adventofcode.com/2019/day/4#part2
 * @param {*} password a six digit passcode (eg, 134445)
 */
function isValidV2(password) {
    let doubleLetters = []

    password = password.toString()

    let lastChar = password[0] // eg, 1
    let lastLastChar
    for (let c = 1; c < password.length; c++) {
        let char = password[c]

        if (lastChar == char) {
            doubleLetters.push(char)

            if (lastLastChar == char) {
                while (doubleLetters[doubleLetters.length - 1] == char) {
                    doubleLetters.pop()
                }
            }
        }

        if (lastChar > char) {
            // digits should never decrease!
            return false
        }

        lastLastChar = lastChar
        lastChar = char
    }

    return doubleLetters.length > 0
}

module.exports = isValidV2
