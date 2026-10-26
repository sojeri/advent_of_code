let { getSantasMap } = require('./03-1-solution')

/**
 * calculates how many houses both Santas were drunkenly sent to visit.
 * full spec: https://adventofcode.com/2015/day/3#part2
 */
function howManyHousesVisited(drunkElfInstructions) {
    if (Array.isArray(drunkElfInstructions)) {
        drunkElfInstructions = drunkElfInstructions[0]
    }

    let santasMap = getSantasMap()
    let santa = { x: 0, y: 0 }
    let roboSanta = { x: 0, y: 0 }

    // report starting locations
    santasMap.reportNewSantaLocation(santa.x, santa.y)
    santasMap.reportNewSantaLocation(roboSanta.x, roboSanta.y)

    let moveSantaLikeObject = (whichWay, quasiSanta) => {
        switch (whichWay) {
            case '^':
                quasiSanta.y++
                break
            case 'v':
                quasiSanta.y--
                break
            case '>':
                quasiSanta.x++
                break
            case '<':
                quasiSanta.x--
                break
            default:
                throw new Error('unrecognized direction')
        }

        // update Santa's map
        santasMap.reportNewSantaLocation(quasiSanta.x, quasiSanta.y)
    }

    // move Santa or RoboSanta
    for (let i = 0; i < drunkElfInstructions.length; i++) {
        instruction = drunkElfInstructions[i]
        moveSantaLikeObject(instruction, i % 2 == 0 ? santa : roboSanta)
    }

    return santasMap.getVisitedHousesCount()
}

module.exports = howManyHousesVisited
