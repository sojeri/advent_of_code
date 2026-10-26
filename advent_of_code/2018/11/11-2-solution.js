function getPowerForCoordinate(x, y, serialNo) {
    let rackId = x + 10
    let powerLevel = rackId * y
    powerLevel += serialNo
    powerLevel = powerLevel * rackId
    let powerLevelString = Math.floor(powerLevel / 100).toString()
    return Number(powerLevelString[powerLevelString.length - 1]) - 5
}

function getPowerForCell(x, y, grid, size) {
    let sum = 0
    for (let i = x - size + 1; i <= x; i++) {
        for (let j = y - size + 1; j <= y; j++) {
            sum += grid[i][j]
        }
    }
    return sum
}

/**
 *
 */
function getLargestPowerCell(gridNo, stop = 30) {
    let fuelCell = new Array(301)
    let highestPowerSeen = -1
    let highestCoord
    for (let x = 1; x <= 300; x++) {
        fuelCell[x] = new Array(301)
        for (let y = 1; y <= 300; y++) {
            fuelCell[x][y] = getPowerForCoordinate(x, y, gridNo)
            for (let size = 1; size <= y && size <= stop; size++) {
                if (x >= size && y >= size) {
                    let currentCell = getPowerForCell(x, y, fuelCell, size)
                    if (currentCell > highestPowerSeen) {
                        highestPowerSeen = currentCell
                        highestCoord = `${x - size + 1},${y - size + 1},${size}`
                    }
                }
            }
        }
    }

    return highestCoord
}

module.exports = {
    getPowerForCell,
    getPowerForCoordinate,
    getLargestPowerCell,
}
