/**
 * calculates the total paper the elves will require to wrap a collection of presents.
 * full spec: https://adventofcode.com/2015/day/2
 * @param {*} soManyPresents a list of present dimensions (@see calculatePaperNeeded)
 */
function calculateTotalPaperForList(soManyPresents) {
    paperNeeded = 0

    soManyPresents.forEach(present => {
        paperNeeded += calculatePaperNeeded(present)
    })

    return paperNeeded
}

/**
 * calculates the amount of paper (in square units) the elves will require
 * to wrap a given present.
 * @param {*} presentDimensions in the form of hxlxw, eg 3x4x5
 */
function calculatePaperNeeded(presentDimensions) {
    // split dimensions into height/length/width
    dimensions = presentDimensions.split('x')
    height = Number(dimensions[0])
    length = Number(dimensions[1])
    width = Number(dimensions[2])

    // calculate sides
    sideHL = height * length
    sideLW = length * width
    sideWH = width * height

    // calculate slack
    smallest = sideHL
    smallest = smallest < sideLW ? smallest : sideLW
    smallest = smallest < sideWH ? smallest : sideWH

    // calculate total paper needed
    paperNeeded = 2 * sideHL + 2 * sideLW + 2 * sideWH + smallest

    return paperNeeded
}

module.exports = {
    calculatePaperNeeded,
    calculateTotalPaperForList,
}
