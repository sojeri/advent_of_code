/**
 * https://adventofcode.com/2022/day/1
 * find the greatest number of calories
 * @param {*} calories
 */
function solution(calories) {
    let max = 0,
        current = 0

    for (let i = 0; i < calories.length; i++) {
        const item = Number.parseInt(calories[i])
        if (Number.isNaN(item)) {
            if (current > max) max = current
            current = 0
            continue
        }
        current += item
    }

    return current > max ? current : max
}

module.exports = solution
