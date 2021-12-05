// https://adventofcode.com/2021/day/3
const { findBitRate } = require('./03-2-solution')

function solution(input) {
    let bitRates = []

    for (let c = 0; c < input[0].length; c++) {
        bitRates[c] = findBitRate(input, c)
    }

    let gammaRate = ''
    let epsilonRate = ''
    bitRates.forEach(calc => {
        if (calc > 0) {
            gammaRate += '1'
            epsilonRate += '0'
        } else {
            gammaRate += '0'
            epsilonRate += '1'
        }
    })
    gammaRate = parseInt(gammaRate, 2)
    epsilonRate = parseInt(epsilonRate, 2)

    return gammaRate * epsilonRate
}

module.exports = solution
