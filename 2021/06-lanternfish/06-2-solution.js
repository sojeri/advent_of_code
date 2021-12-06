// https://adventofcode.com/2021/day/6#part2
const { NUMBER_MAPPER } = require('../04-giant-squid/04-1-solution')

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
 * @param {*} duration the # of days to simulate the population over
 * @returns
 */
function simulateLanternfish(startingPop, duration, debug = false) {
    let currentPop = hydrateStartingPop(startingPop)
    let day = 0
    while (day < duration) {
        const hatchlings = {
            8: 0,
            7: 0,
            6: 0,
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
            0: 0,
        }
        BASE_KEYS.forEach(fishValue => {
            const fishValueAfterFourDays = fishValue - 4
            const fishCount = currentPop[fishValue]
            switch (fishValueAfterFourDays) {
                case -1:
                    hatchlings[6] += fishCount
                    hatchlings[8] += fishCount
                    break
                case -2:
                    hatchlings[5] += fishCount
                    hatchlings[7] += fishCount
                    break
                case -3:
                    hatchlings[4] += fishCount
                    hatchlings[6] += fishCount
                    break
                case -4:
                    hatchlings[3] += fishCount
                    hatchlings[5] += fishCount
                    break
                default:
                    hatchlings[fishValueAfterFourDays] += fishCount
                    break
            }
        })

        currentPop = hatchlings
        if (debug) console.log('finished processing day', day, '\ncurrent pop is', currentPop.join(','))
        day += 4
    }

    return currentPop
}

function solution(startingPop, debug = false) {
    const lanternfishPop = simulateLanternfish(startingPop[0], 256, debug)

    let finalCount = 0
    BASE_KEYS.forEach(fishValue => {
        finalCount += lanternfishPop[fishValue]
    })

    return finalCount
}

module.exports = { solution, simulateLanternfish }
