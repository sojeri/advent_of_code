const sum = (total, num) => {
    return total + num
}

// TODO: sanity check tests for this
//       - probably call out string concat possibilities?

/**
 * given an array of numeric values, returns the sum
 * @param {*} numericValues
 */
function simpleSum(numericValues) {
    return numericValues.reduce(sum)
}

/**
 * given an array of mysterious values and a callback which coverts a mysterious value into a number, returns the sum
 * @param {*} mysteriousValues the array of mysterious values
 * @param {*} quantifyMysteryCb the callback used to covert mysteries into numbers
 */
function complexSum(mysteriousValues, quantifyMysteryCb) {
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
