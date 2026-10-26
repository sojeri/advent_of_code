// https://adventofcode.com/2021/day/3#part2

/**
 * iterates over the input array, systematically reducing the collection
 * according to the puzzle criteria. eg when called for oxygen:
 * > determine the most common value (0 or 1) in the current bit position,
 * > and keep only numbers with that bit in that position. If 0 and 1 are
 * > equally common, keep values with a 1 in the position being considered
 * @param {*} input array of bit signals, eg ['1101', '0001']
 * @param {*} first when 1 is most common, the value to keep when reducing the collection
 * @param {*} second when 0 is most common, the value to keep when reducing the collection
 * @param {*} debug flag indicating whether to log debug info
 * @returns
 */
function findRating(input, first, second, debug = false) {
    let isRatingFound = false
    let currentIndex = 0
    let collection = [...input]

    while (!isRatingFound && currentIndex < input[0].length) {
        const bitRate = findBitRate(collection, currentIndex)
        if (bitRate >= 0) {
            collection = collection.filter(word => {
                return word[currentIndex] === first
            })
        } else {
            collection = collection.filter(word => {
                return word[currentIndex] === second
            })
        }
        if (debug) console.log(collection)

        currentIndex++
        isRatingFound = collection.length === 1
    }

    return collection[0]
}

/**
 * To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
 * @param {*} input array of bit signals, eg ['1101', '0001']
 * @param {*} debug flag indicating whether to log debug info
 */
function findOxygenGeneratorRate(input, debug = false) {
    return findRating(input, '1', '0', debug)
}

/**
 * To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.
 * @param {*} input array of bit signals, eg ['1101', '0001']
 * @param {*} debug flag indicating whether to log debug info
 */
function findCO2ScrubberRate(input, debug = false) {
    return findRating(input, '0', '1', debug)
}

/**
 * given an array of bit strings and an index to check, returns an integer rating
 * @param {*} input the array of bit strings, eg [1110, 0101]
 * @param {*} bitToCheck the string index to compare, eg, 1 for the second character
 * @returns either a positive number for more 1s found than 0s, a negative number for more 0s than 1s, or a zero for ties
 */
function findBitRate(input, bitToCheck) {
    let bitRate = 0

    input.forEach(word => {
        const char = word[bitToCheck]
        switch (char) {
            case '0':
                bitRate -= 1
                break
            case '1':
                bitRate += 1
                break
        }
    })

    return bitRate
}

function solution(input, debug = false) {
    const oxygenGeneratorRate = findOxygenGeneratorRate(input, debug)
    const co2ScrubberRate = findCO2ScrubberRate(input, debug)

    if (debug) console.log(oxygenGeneratorRate)
    if (debug) console.log(co2ScrubberRate)

    return parseInt(oxygenGeneratorRate, 2) * parseInt(co2ScrubberRate, 2)
}

module.exports = {
    solution,
    findCO2ScrubberRate,
    findOxygenGeneratorRate,
    findBitRate,
}
