//
const { descendingSort } = require('../../utils/js/sorts')

/*
--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

    aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
    a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
    not-a-real-room-404[oarel] is a real room.
    totally-real-room-200[decoy] is not.

Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?
*/

function getLetterCounts(word) {
    const dict = {}
    for (let i = 0; i < word.length; i++) {
        const char = word[i]
        if (dict[char] === undefined) {
            dict[char] = 1
        } else {
            dict[char] += 1
        }
    }
    return dict
}

function sortLetterCounts(dict) {
    const inverted = {}
    Object.entries(dict).forEach(entry => {
        const [char, count] = entry
        if (inverted[count] === undefined) {
            inverted[count] = [char]
        } else {
            inverted[count].push(char)
        }
    })
    const counts = Object.keys(inverted)
        .map(s => Number(s)) // ugh the string keys lolsob
        .sort(descendingSort)
    inverted.counts = counts
    return inverted
}

function isChecksumValid(word, checksum) {
    const letters = getLetterCounts(word)
    const meta = sortLetterCounts(letters)

    let currentMaxIndex = 0
    let currentMax = meta.counts[0]
    let currentMaxCount = 0
    for (let i = 0; i < checksum.length; i++) {
        const char = checksum[i]
        if (letters[char] === currentMax) {
            currentMaxCount++
            continue
        }

        if (currentMaxCount === meta[currentMax].length) {
            currentMaxIndex++
            currentMaxCount = 0
            currentMax = meta.counts[currentMaxIndex]
        }

        if (letters[char] === currentMax) {
            currentMaxCount++
        } else {
            return false
        }
    }

    return true
}

const LETTER_MATCHER = /[a-z]+/g
const NUMBER_MATCHER = /\d+/

function getNumberFromStr(str) {
    const firstNumberFound = str.match(NUMBER_MATCHER)[0]
    return Number(firstNumberFound)
}

function isValidRoom(str) {
    const stringParts = str.split('[')
    const [almostWord, almostChecksum] = stringParts
    const word = [...almostWord.matchAll(LETTER_MATCHER)].join('')
    const checksumParts = almostChecksum.split(']')
    const [checksum, _nope] = checksumParts
    return isChecksumValid(word, checksum)
}

function solution(rooms) {
    let sum = 0
    rooms.forEach(room => {
        if (isValidRoom(room)) {
            sum += getNumberFromStr(room)
        }
    })
    return sum
}

module.exports = {
    getLetterCounts,
    sortLetterCounts,
    isChecksumValid,
    isValidRoom,
    solution,
    getNumberFromStr,
}
