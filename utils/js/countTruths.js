const ArgumentErrorNotArray = 'ArgumentError: arrayOfPossibleTruths should be an array'
const ArgumentErrorNotFunction = 'ArgumentError: truthinessCallback should be a function'

/**
 * given an arrary of possible truths and a truthiness callback, returns the total count of possible truths according to said truthiness callback
 * @param {*} arrayOfPossibleTruths a collection of items to be verified by the truthiness callback
 * @param {*} truthinessCallback a function which returns a boolean value indicating whether an item is truthy
 */
function countTruths(arrayOfPossibleTruths, truthinessCallback) {
    if (!Array.isArray(arrayOfPossibleTruths)) {
        throw new Error(ArgumentErrorNotArray)
    }

    if (typeof truthinessCallback !== 'function') {
        throw new Error(ArgumentErrorNotFunction)
    }

    let count = 0

    arrayOfPossibleTruths.forEach(possibleTruth => {
        if (truthinessCallback(possibleTruth)) {
            count++
        }
    })

    return count
}

module.exports = {
    ArgumentErrorNotArray,
    ArgumentErrorNotFunction,
    countTruths
}