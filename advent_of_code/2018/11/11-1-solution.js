let { getPowerForCell, getPowerForCoordinate } = require('./11-2-solution')

function getLargestPower3x3Cell(gridNo) {
    let fuelCell = new Array(301)
    let highest3x3PowerSeen = -1
    let highestCoord
    for (let x = 1; x <= 300; x++) {
        fuelCell[x] = new Array(301)
        for (let y = 1; y <= 300; y++) {
            fuelCell[x][y] = getPowerForCoordinate(x, y, gridNo)
            if (x >= 3 && y >= 3) {
                let current3x3Cell = getPowerForCell(x, y, fuelCell, 3)
                if (current3x3Cell > highest3x3PowerSeen) {
                    highest3x3PowerSeen = current3x3Cell
                    highestCoord = `${x - 2},${y - 2}`
                }
            }
        }
    }

    return highestCoord
}

module.exports = {
    getPowerForCoordinate,
    getLargestPower3x3Cell,
}
