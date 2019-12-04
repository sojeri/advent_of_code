const { ascendingSort } = require('../../utils/js/sorts')

/**
 * keeps track of already seen coordinates, eg {'0,1': true}.
 * if one is ever seen twice, we have a wire intersection.
 */
let seen

/**
 * keeps track of known intersections.
 *
 */
let knownIntersections

/**
 * tracks a given wire's movement along a given axis for a given number of steps
 * @param {*} axis the axis (x or y) to track movement along
 * @param {*} modifier a numeric value (1 or -1) indicating whether movement is up or down the given axis
 * @param {*} steps how many steps to take along the axis
 * @param {*} wire the wire to track movement for signature: { x, y, name, steps }
 */
function trackMovement(axis, modifier, stop, wire) {
    for (let start = 1; start <= stop; start++) {
        wire.steps++
        wire[axis] = wire[axis] + modifier
        let coord = `${wire.x},${wire.y}`

        if (!seen[coord]) {
            seen[coord] = {}
        }

        if (!seen[coord][wire.name]) {
            seen[coord][wire.name] = wire.steps
        }

        let here = Object.keys(seen[coord])
        if (here.length >= 2) {
            if (knownIntersections[coord]) {
                knownIntersections[coord].push(wire.steps)
            } else {
                knownIntersections[coord] = []
                knownIntersections[coord].push(seen[coord][here[0]])
                knownIntersections[coord].push(seen[coord][here[1]])
            }
        }
    }
}

/**
 * for a given collection of wires, returns the least number of steps to the wire intersection closest to the origin (0,0).
 * full spec: https://adventofcode.com/2019/day/3#part2
 * @param {*} wires a set of wires as defined by their movements (eg, R6,U34,L7)
 */
function findShortestDistance(wires) {
    seen = {}
    knownIntersections = {}

    wires.forEach((wireInstructions, wireName) => {
        let wire = {
            name: wireName,
            x: 0,
            y: 0,
            steps: 0,
        }

        let instructions = wireInstructions.split(',')
        for (let i = 0; i < instructions.length; i++) {
            let instruction = instructions[i]

            let howFar = Number(instruction.slice(1))
            switch (instruction[0]) {
                case 'U':
                    trackMovement('y', 1, howFar, wire)
                    break
                case 'D':
                    trackMovement('y', -1, howFar, wire)
                    break
                case 'R':
                    trackMovement('x', 1, howFar, wire)
                    break
                case 'L':
                    trackMovement('x', -1, howFar, wire)
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

    Object.keys(intersectionDetails).forEach(intersection => {
        let stepCounts = intersectionDetails[intersection]
        let sorted = stepCounts.sort(ascendingSort)
        minSteps.push(sorted[0] + sorted[1])
    })

    let sorted = minSteps.sort(ascendingSort)
    return sorted[0]
}

module.exports = findShortestDistance
