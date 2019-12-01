function getSantasMap() {
    let visitedHouses = {}
    let visitedHousesCount = 0

    let reportNewSantaLocation = (x, y) => {
        let currentHouseAddress = `${x},${y}`
        if (!visitedHouses[currentHouseAddress]) {
            visitedHousesCount++
            visitedHouses[currentHouseAddress] = true
        }
    }

    let getVisitedHousesCount = () => {
        return visitedHousesCount
    }

    return {
        reportNewSantaLocation,
        getVisitedHousesCount,
    }
}

/**
 * calculates how many houses Santa was drunkenly sent to visit.
 * full spec: https://adventofcode.com/2015/day/3
 */
function howManyHousesVisited(drunkElfInstructions) {
    if (Array.isArray(drunkElfInstructions)) {
        drunkElfInstructions = drunkElfInstructions[0]
    }

    let santasMap = getSantasMap()
    let x = 0
    let y = 0

    // report starting location
    santasMap.reportNewSantaLocation(x, y)

    // move Santa
    for (let i = 0; i < drunkElfInstructions.length; i++) {
        instruction = drunkElfInstructions[i]
        switch (instruction) {
            case '^':
                y++
                break
            case 'v':
                y--
                break
            case '>':
                x++
                break
            case '<':
                x--
                break
            default:
                throw new Error('unrecognized direction')
        }

        // update Santa's map
        santasMap.reportNewSantaLocation(x, y)
    }

    return santasMap.getVisitedHousesCount()
}

module.exports = { howManyHousesVisited, getSantasMap }
