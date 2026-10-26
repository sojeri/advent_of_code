// https://adventofcode.com/2021/day/1#part2

function solution(input) {
    const numero = index => Number(input[index])

    let isBiggerCount = 0

    for (let i = 0; i < input.length - 3; i++) {
        const first = numero(i) + numero(i + 1) + numero(i + 2)
        const second = first - numero(i) + numero(i + 3)
        if (first < second) isBiggerCount++
    }

    return isBiggerCount
}

module.exports = solution
