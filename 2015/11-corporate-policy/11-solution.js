// https://adventofcode.com/2015/day/11

/**
 * returns true if a given password contains at
 * least two non-overlapping distinct doubles.
 * @param {*} password eg, aalmnobb √, aalmnoaa x
 * @returns true or false
 */
function isValidDouble(password) {
    let first
    for (let c = 0; c < password.length - 1; c++) {
        const current = password[c]
        const next = password[c + 1]
        if (current === next) {
            if (!first) {
                first = current
                c++ // skip next to avoid overlap
            } else if (first !== current) {
                return true
            }
        }
    }

    return false
}

/**
 * returns true if a given password contains a 3
 * letter straight, eg abc, rst
 * @param {*} password eg, aalmnjbb √, aalmjnbb x
 */
function isValidStraight(password) {
    for (let c = 0; c < password.length - 2; c++) {
        const first = password[c]
        const second = password[c + 1]
        const third = password[c + 2]
        if (getNextLetter(first) === second && getNextLetter(second) === third) {
            return true
        }
    }

    return false
}

/**
 * returns true if a given password is valid and false otherwise.
 * specifics of password validation come from the puzzle text
 * @param {*} password
 */
function isValid(password) {
    // banned letter rules
    if (password.indexOf('i') > -1) return false
    if (password.indexOf('o') > -1) return false
    if (password.indexOf('l') > -1) return false

    // consecutive letter rules
    return isValidDouble(password) && isValidStraight(password)
}

const LETTERS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]

/**
 * gets the next letter alphabetically. there are
 * probably better ways to do this in JS based on
 * how english text uses ASCII, but I'm not doing
 * that today. :)
 * @param {*} letter a single letter, eg x, y, z
 * @returns the next letter in the alphabet, eg y, z, a
 */
function getNextLetter(letter) {
    const current = LETTERS.indexOf(letter)
    const next = (current + 1) % 26
    return LETTERS[next]
}

/**
 * increments the letters in a password, eg abcd -> abce
 * calls itself recursively to handle rollovers, eg abcz -> abda
 * @param {*} password the password to increment
 * @param {*} i the index of the current letter being incremented
 * @returns
 */
function getNextPossiblePassword(password, i) {
    if (password[i] === 'z') {
        // if rollover
        password[i] = 'a' // eg 9 becomes 0
        if (i === 0) return password

        // eg after 9 becomes zero, increment tens by 1
        return getNextPossiblePassword(password, i - 1)
    }

    password[i] = getNextLetter(password[i])
    return password
}

function solution(initial) {
    let currentPassword = initial.split('')

    while (!isValid(currentPassword)) {
        currentPassword = getNextPossiblePassword(currentPassword, currentPassword.length - 1)
    }

    return currentPassword.join('')
}

module.exports = {
    solution,
    getNextPossiblePassword,
    isValid,
    isValidDouble,
    isValidStraight,
}
