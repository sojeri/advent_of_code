let { countRedistributionCycles, getNewMax } = require('./06-1-solution')

/**
 * counts how many distinct redistrubition cycles are part of the infinite loop that
 * results after the debugger has seen its first repeat configuration.
 * per spec defined in https://adventofcode.com/2017/day/6#part2
 * @param {*} banks
 */
function findFirstRepeatThenCountInifiniteLoop(banks) {
    let count = 0

    function isInfiniteLoopCounted(knownConfigs, config) {
        if (knownConfigs[config] == 2) return false

        knownConfigs[config] = 2
        count++
        return true
    }

    countRedistributionCycles(banks, isInfiniteLoopCounted)
    return count
}

module.exports = findFirstRepeatThenCountInifiniteLoop
