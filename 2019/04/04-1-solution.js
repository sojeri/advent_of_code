/**
 * given a password, returns a flag indicating whether it might be the missing password
 * @param {*} password a six digit passcode (eg, 134445)
 */
function isValid(password) {
    let isDoubleLetter = false

    password = password.toString()
    for (let c = 0; c < password.length - 1; c++) {
        let char = password[c]
        let nextChar = password[c + 1]

        if (char == nextChar) {
            isDoubleLetter = true
        }

        if (char > nextChar) {
            // digits should never decrease!
            return false
        }
    }

    return isDoubleLetter
}

/**
 * for the range 130254 to 678275, returns the number of valid passwords per the few requirements the elves remember.
 * full spec: https://adventofcode.com/2019/day/4
 * @param {*} isValidCb a callback used to validate possible passcodes
 */
function howManyValidPasswordsInRange(isValidCb = isValid) {
    let from = 130254
    let to = 678275

    let count = 0
    for (let i = from; i <= to; i++) {
        if (isValidCb(i)) {
            count++
        }
    }
    return count
}

module.exports = {
    howManyValidPasswordsInRange,
    isValid,
}
