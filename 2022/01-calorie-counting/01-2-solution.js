let { descendingSort } = require('../../utils/js/sorts')

/**
 * https://adventofcode.com/2022/day/1#part2
 * returns top three max calories
 */
function solution(calories) {
    const sums = []
    let current = 0

    for (let i = 0; i < calories.length; i++) {
        const item = Number.parseInt(calories[i])
        if (Number.isNaN(item)) {
            sums.push(current)
            current = 0
            continue
        }
        current += item
    }
    sums.push(current) // handle last set

    const sorted = sums.sort(descendingSort)
    console.log(sums, sorted)
    return sorted[0] + sorted[1] + sorted[2]
}

module.exports = solution
