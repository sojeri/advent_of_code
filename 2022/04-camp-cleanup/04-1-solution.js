/**
 * https://adventofcode.com/2022/day/4
 * count overlapping contained assignments
 * (eg 2-4 is overlapping and fully contained in 2-6)
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
    if (left.from <= right.from && left.to >= right.to) return true
    if (right.from <= left.from && right.to >= left.to) return true
    return false
}

module.exports = solution
