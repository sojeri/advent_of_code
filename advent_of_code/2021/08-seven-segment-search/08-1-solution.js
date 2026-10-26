// https://adventofcode.com/2021/day/8

function countEasilyIdentifiedNumbers(line) {
    const [_, mysteriousNumbers] = line.split('|')
    let total1478s = 0
    mysteriousNumbers.split(' ').forEach(letter => {
        switch (letter.length) {
            case 2:
            case 3:
            case 4:
            case 7:
                total1478s++
                break
            default:
                break
        }
    })
    return total1478s
}

function solution(input) {
    let total1478s = 0
    input.forEach(line => {
        total1478s += countEasilyIdentifiedNumbers(line)
    })
    return total1478s
}

module.exports = solution
