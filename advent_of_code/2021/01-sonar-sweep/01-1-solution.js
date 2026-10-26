// https://adventofcode.com/2021/day/1

function solution(input) {
    let last
    let isBiggerCount = 0
    input.forEach((value, index) => {
        const num = Number(value)
        if (num > last && index > 0) isBiggerCount++
        last = num
    })
    return isBiggerCount
}

module.exports = solution
