const sum = (total, num) => {
    return total + num
}

/**
 * given an array of numeric values, returns the sum
 * @param {*} numericValues
 */
function simpleSum(numericValues) {
    if (!Array.isArray(numericValues)) {
        throw new Error('ArgumentError: numericValues should be an array')
    }

    return numericValues.reduce(sum)
}

/**
 * given an array of mysterious values and a callback which coverts a mysterious value into a number, returns the sum
 * @param {*} mysteriousValues the array of mysterious values
 * @param {*} quantifyMysteryCb the callback used to covert mysteries into numbers
 */
function complexSum(mysteriousValues, quantifyMysteryCb) {
    if (!Array.isArray(mysteriousValues)) {
        throw new Error('ArgumentError: mysteriousValues should be an array')
    }

    if (typeof quantifyMysteryCb !== 'function') {
        throw new Error('ArgumentError: quantifyMysteryCb should be a function')
    }

    let total = 0

    mysteriousValues.forEach(mystery => {
        total += quantifyMysteryCb(mystery)
    })

    return total
}

module.exports = {
    simpleSum,
    complexSum,
}
