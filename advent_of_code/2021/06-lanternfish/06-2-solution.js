// https://adventofcode.com/2021/day/6#part2
const { NUMBER_MAPPER } = require('../04-giant-squid/04-1-solution')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')

const VERBOSE = false
const logger = getLogger('aoc (2021/6/2) :: ', VERBOSE ? VERBOSITY.DEBUG : VERBOSITY.WARN)

const BASE_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function hydrateStartingPop(input) {
    const startingPop = {}
    BASE_KEYS.forEach(base => {
        startingPop[base] = 0
    })
    input
        .split(',')
        .map(NUMBER_MAPPER)
        .forEach(fish => {
            startingPop[fish] += 1
        })
    return startingPop
}

/**
 * simulates lanternfish population growth over time
 * @param {*} startingPop the starting lanternfish population
 * @param {*} duration the # of days to simulate the population over MUST BE A MULTIPLE OF FOUR TO GET ACCURATE DATA
 * @returns
 */
function simulateLanternfish(startingPop, duration) {
    let currentPop = hydrateStartingPop(startingPop)
    let day = 0
    const TOTAL_DISTINCT_FISH_PHASES = 9
    while (day < duration) {
        const hatchlings = {}
        BASE_KEYS.forEach(base => (hatchlings[base] = 0))
        BASE_KEYS.forEach(fishValue => {
            const newFishValue = fishValue - 4
            const fishCount = currentPop[fishValue]
            if (newFishValue < 0) {
                hatchlings[TOTAL_DISTINCT_FISH_PHASES + newFishValue] += fishCount
                hatchlings[TOTAL_DISTINCT_FISH_PHASES + newFishValue - 2] += fishCount
            } else {
                hatchlings[newFishValue] += fishCount
            }
        })

        currentPop = hatchlings
        logger.log('finished processing day', day, '\ncurrent pop is', {
            currentPop: Array.isArray(currentPop) ? currentPop.join(',') : currentPop,
        })
        day += 4
    }

    return currentPop
}

function solution(startingPop) {
    const lanternfishPop = simulateLanternfish(startingPop[0], 256)

    let finalCount = 0
    BASE_KEYS.forEach(fishValue => {
        finalCount += lanternfishPop[fishValue]
    })

    return finalCount
}

module.exports = { solution, simulateLanternfish }
