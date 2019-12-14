let { complexSum } = require('../../utils/js/sumArray')

/**
 * returns the amount of fuel required to launch a given mass
 * @param {*} item the mass of a module piece
 */
function calculateFuelForItem(item) {
    let fuelRequired = Number(item) / 3
    fuelRequired = Math.floor(fuelRequired)
    return fuelRequired - 2
}

/**
 * calculates the amount of fuel required to launch a whole ship -- as represented by an array of masses of all its parts.
 * full spec: https://adventofcode.com/2019/day/1
 * @param {*} partsList
 */
function calculateFuelWholeShip(partsList) {
    return complexSum(partsList, calculateFuelForItem)
}

module.exports = {
    calculateFuelForItem,
    calculateFuelWholeShip,
}
