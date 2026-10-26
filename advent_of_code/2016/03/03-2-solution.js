const { isPossiblyTriangle } = require('./03-1-solution')

/**
 * given a list of triangles, returns the count of how many could possibly be triangles.
 * full spec: https://adventofcode.com/2016/day/3#part2
 * @param {*} yeOldeListOTriangles a collection of possible triangles (reads TTB, LTR)
 */
function countPossibleTriangles(yeOldeListOTriangles) {
    let countMyOwnTruthsMOFO = 0

    for (let t = 0; t < yeOldeListOTriangles.length; t += 3) {
        // deconstruct 3 rows at once
        let row1 = yeOldeListOTriangles[t].split(/\s+/g)
        let row2 = yeOldeListOTriangles[t + 1].split(/\s+/g)
        let row3 = yeOldeListOTriangles[t + 2].split(/\s+/g)

        // convert each column into a possible triangle & increment if it passes
        for (let mebbe = 1; mebbe <= 3; mebbe++) {
            let mebbeTriangle = `${row1[mebbe]} ${row2[mebbe]} ${row3[mebbe]}`
            if (isPossiblyTriangle(mebbeTriangle)) {
                countMyOwnTruthsMOFO++
            }
        }
    }

    return countMyOwnTruthsMOFO
}

module.exports = countPossibleTriangles
