let { countTruths } = require('../../utils/js/countTruths')

/**
 * given a possible triangle, returns a boolean value indicating whether it could possibly be one
 * @param {*} yePossibleTriangle a possible triangle -- as represented by 3 side lengths (eg, '5 10 25')
 */
function isPossiblyTriangle(yePossibleTriangle) {
    let sides = yePossibleTriangle.split(/\s+/g)

    // hackery to handle weird whitespace in input file
    if (sides.length == 4) {
        sides = sides.slice(1)
    }

    sides = sides.map(s => {
        return Number(s)
    })

    let isTriangle = sides[0] + sides[1] > sides[2]
    isTriangle = isTriangle && sides[1] + sides[2] > sides[0]
    isTriangle = isTriangle && sides[2] + sides[0] > sides[1]

    return isTriangle
}

/**
 * given a list of triangles, returns the count of how many could possibly be triangles.
 * full spec: https://adventofcode.com/2016/day/3
 * @param {*} yeOldeListOTriangles a collection of possible triangles (reads LTR)
 */
function countPossibleTriangles(yeOldeListOTriangles) {
    return countTruths(yeOldeListOTriangles, isPossiblyTriangle)
}

module.exports = {
    isPossiblyTriangle,
    countPossibleTriangles,
}
