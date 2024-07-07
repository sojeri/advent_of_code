let v1 = require('./06-1-solution')

/**
 * https://adventofcode.com/2022/day/6#part2
 * find marker size 14, not 4
 */
function solution(str) {
    return v1(str, 14)
}

module.exports = solution
