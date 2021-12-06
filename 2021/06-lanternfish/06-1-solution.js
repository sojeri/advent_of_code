// https://adventofcode.com/2021/day/6
const { NUMBER_MAPPER } = require('../04-giant-squid/04-1-solution')

/**
 * simulates lanternfish population growth over time
 * @param {*} startingPop the starting lanternfish population
 * @param {*} duration the # of days to simulate the population over
 * @returns
 */
function simulateLanternfish(startingPop, duration, debug = false) {
    let currentPop = startingPop.split(',').map(NUMBER_MAPPER)
    let day = 0
    while (day < duration) {
        const nextPop = []
        const newFish = []
        currentPop.forEach(fish => {
            if (fish - 1 < 0) {
                nextPop.push(6)
                newFish.push(8)
            } else {
                nextPop.push(fish - 1)
            }
        })

        currentPop = [...nextPop, ...newFish]
        if (debug) console.log('finished processing day', day, '\ncurrent length is', currentPop.length)
        day++
    }

    return currentPop
}

function solution(startingPop, debug = false) {
    const lanternfishPop = simulateLanternfish(startingPop[0], 80, debug)
    return lanternfishPop.length
}

module.exports = {
    solution,
    simulateLanternfish,
}
