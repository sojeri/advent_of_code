/**
 * https://adventofcode.com/2022/day/4#part2
 * count ANY overlapping assignments
 * eg 5-7 overlaps with 7-8
 */
function solution(assignments) {
    let count = 0
    assignments.forEach(a => {
        if (isOverlapping(a)) count++
    })
    return count
}

function parse(raw) {
    const [from, to] = raw.split('-')
    return {
        from: Number.parseInt(from),
        to: Number.parseInt(to),
    }
}

function isOverlapping(raw) {
    const [left, right] = raw.split(',').map(r => parse(r))
    // leaving these b/c they helped me figure out the correct if cases below
    // 1,2 2,3
    // 2,3 1,2
    // 1,2 3,4
    if (left.to >= right.from && left.from <= right.from) return true
    if (right.to >= left.from && right.from <= left.from) return true
    return false
}

module.exports = solution
