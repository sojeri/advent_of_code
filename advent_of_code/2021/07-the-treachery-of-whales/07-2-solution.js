// https://adventofcode.com/2021/day/7#part2
const part1 = require('./07-1-solution')

const fuelCosts = [0, 1, 3]
function getFuelCost(steps) {
    // check save
    if (steps < 0) return 0
    if (fuelCosts[steps]) {
        return fuelCosts[steps]
    }

    // calc & save
    const cost = steps + getFuelCost(steps - 1)
    fuelCosts[steps] = cost

    // return calc
    return fuelCosts[steps]
}

function solution(input) {
    return part1(input, getFuelCost)
}

module.exports = solution
