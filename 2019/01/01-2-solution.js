let { calculateFuelForItem } = require('./01-1-solution')
let { complexSum } = require('../../utils/js/sumArray')

function calculateFuelForItemV2(itemMass) {
    let fuelForItem = calculateFuelForItem(itemMass)

    let isAdditionalFuelNeeded = true

    // initial calculation of fuel to launch fuel
    let fuelToLaunchFuel = calculateFuelForItem(fuelForItem)
    if (fuelToLaunchFuel > 0) {
        fuelForItem += fuelToLaunchFuel
    } else {
        isAdditionalFuelNeeded = false
    }

    // loop on fuel to launch fuel
    while (isAdditionalFuelNeeded) {
        fuelToLaunchFuel = calculateFuelForItem(fuelToLaunchFuel)
        if (fuelToLaunchFuel > 0) {
            fuelForItem += fuelToLaunchFuel
        } else {
            isAdditionalFuelNeeded = false
        }
    }

    return fuelForItem
}

/**
 * calculates the amount of fuel required to launch a whole ship -- as represented by an array of masses of all its parts.
 * full spec: https://adventofcode.com/2019/day/1#part2
 */
function calculateFuelWholeShipV2(shipParts) {
    return complexSum(shipParts, calculateFuelForItemV2)
}

module.exports = {
    calculateFuelForItemV2,
    calculateFuelWholeShipV2,
}
