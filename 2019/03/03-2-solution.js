let { ascendingSort } = require('../../utils/js/sorts')

let seen
let knownIntersections
let currentLocation
let steps

function moveBlocks(axis, modifier, stop, name) {
    for (let start = 1; start <= stop; start++) {
        steps++
        currentLocation[axis] = currentLocation[axis] + modifier
        let coord = `${currentLocation.x},${currentLocation.y}`

        if (!seen[coord]) {
            seen[coord] = {}
        }

        if (!seen[coord][name]) {
            seen[coord][name] = steps
        }

        let here = Object.keys(seen[coord])
        if (here.length >= 2) {
            if (knownIntersections[coord]) {
                knownIntersections[coord].push(steps)
            } else {
                knownIntersections[coord] = []
                knownIntersections[coord].push(seen[coord][here[0]])
                knownIntersections[coord].push(seen[coord][here[1]])
            }
        }
    }
}

function findShortestDistance(wires) {
    seen = {}
    knownIntersections = {}

    wires.forEach((wireInstructions, wireName) => {
        steps = 0
        currentLocation = { x: 0, y: 0 }

        let instructions = wireInstructions.split(',')
        for (let i = 0; i < instructions.length; i++) {
            let instruction = instructions[i]

            // handle move
            let move = Number(instruction.slice(1))
            switch (instruction[0]) {
                case 'U':
                    moveBlocks('y', 1, move, wireName)
                    break
                case 'D':
                    moveBlocks('y', -1, move, wireName)
                    break
                case 'R':
                    moveBlocks('x', 1, move, wireName)
                    break
                case 'L':
                    moveBlocks('x', -1, move, wireName)
                    break
                default:
                    throw new Error('unrecognized drection')
            }
        }
    })

    return findMinSteps(knownIntersections)
}

/**
 * given an object describing intersection details, finds the least number of steps required to access an intersection
 * @param {*} intersectionDetails an object with unique keys whose values are arrays of numeric values, eg {'intersection17': [4,76,13]}
 */
function findMinSteps(intersectionDetails) {
    let minSteps = []

    // intersectionDetails[coord][someSteps,otherSteps,evenMoarSteps]
    Object.keys(intersectionDetails).forEach(intersection => {
        let stepCounts = intersectionDetails[intersection]
        let sorted = stepCounts.sort(ascendingSort)
        minSteps.push(sorted[0] + sorted[1])
    })

    let sorted = minSteps.sort(ascendingSort)
    return sorted[0]
}

module.exports = findShortestDistance
