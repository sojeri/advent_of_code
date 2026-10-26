/**
 * calculates the total ribbon the elves will require to wrap a collection of presents.
 * full spec: https://adventofcode.com/2015/day/2
 * @param {*} soManyPresents a list of present dimensions (@see calculateRibbonNeeded)
 */
function calculateTotalRibbonForList(soManyPresents) {
    ribbonNeeded = 0

    soManyPresents.forEach(present => {
        ribbonNeeded += calculateRibbonNeeded(present)
    })

    return ribbonNeeded
}

function multiply(total, next) {
    return total * next
}

function ascending(a, b) {
    return a - b
}

/**
 * calculates the amount of ribbon (in units) the elves will require
 * to wrap a given present.
 * @param {*} presentDimensions in the form of hxlxw, eg 3x4x5
 */
function calculateRibbonNeeded(presentDimensions) {
    let dimensions = presentDimensions
        .split('x')
        .map(d => Number(d))
        .sort(ascending)
    let smallest = dimensions[0]
    let nextSmallest = dimensions[1]

    let volume = dimensions.reduce(multiply, 1)

    let ribbonNeeded = 2 * smallest + 2 * nextSmallest + volume

    return ribbonNeeded
}

module.exports = {
    calculateRibbonNeeded,
    calculateTotalRibbonForList,
}
