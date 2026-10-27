// https://adventofcode.com/2021/day/6
const { NUMBER_MAPPER } = require('../04-giant-squid/04-1-solution')

const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')

const VERBOSE = false
const logger = getLogger('aoc (2021/6/1) :: ', VERBOSE ? VERBOSITY.DEBUG : VERBOSITY.WARN)

/**
 * simulates lanternfish population growth over time
 * @param {*} startingPop the starting lanternfish population
 * @param {*} duration the # of days to simulate the population over
 * @returns
 */
function simulateLanternfish(startingPop, duration) {
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
        logger.log('finished processing day', day, '\ncurrent length is', { currentPop: currentPop.length })
        day++
    }

    return currentPop
}

function solution(startingPop) {
    const lanternfishPop = simulateLanternfish(startingPop[0], 80)
    return lanternfishPop.length
}

module.exports = {
    solution,
    simulateLanternfish,
}
