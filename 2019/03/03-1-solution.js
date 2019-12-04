/**
 * keeps track of already seen coordinates, eg {'0,1': true}.
 * if one is ever seen twice, we have a wire intersection.
 */
let seen

/**
 * keeps track of intersection manhattan distances.
 * (every time a new intersection is found, its manhattan distance is saved here.)
 */
let knownIntersections

/**
 * tracks a given wire's movement along a given axis for a given number of steps
 * @param {*} axis the axis (x or y) to track movement along
 * @param {*} modifier a numeric value (1 or -1) indicating whether movement is up or down the given axis
 * @param {*} steps how many steps to take along the axis
 * @param {*} wire the wire to track movement for signature: { x, y, name }
 */
function trackMovement(axis, modifier, steps, wire) {
    for (let s = 1; s <= steps; s++) {
        wire[axis] = wire[axis] + modifier
        let coord = `${wire.x},${wire.y}`

        if (!seen[coord]) {
            seen[coord] = []
        }

        if (seen[coord].indexOf(wire.name) == -1) {
            seen[coord].push(wire.name)

            if (seen[coord].length == 2) {
                knownIntersections.push(Math.abs(wire.x) + Math.abs(wire.y))
            }
        }
    }
}

/**
 * for a given collection of wires, returns the manhattan distance of the wire intersection closest to the origin (0,0).
 * full spec: https://adventofcode.com/2019/day/3
 * @param {*} wires a set of wires as defined by their movements (eg, R6,U34,L7)
 */
function findClosestIntersection(wires) {
    seen = {}
    knownIntersections = []

    // track all the wires
    wires.forEach((wireInstructions, wireName) => {
        let wire = {
            name: wireName,
            x: 0,
            y: 0,
        }

        let instructions = wireInstructions.split(',')
        for (let i = 0; i < instructions.length; i++) {
            let instruction = instructions[i] // eg, R76

            let howFar = Number(instruction.slice(1)) // eg, 76
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

    // find shortest distance
    let min = knownIntersections[0]
    knownIntersections.forEach(k => {
        min = min < k ? min : k
    })

    return min
}

module.exports = findClosestIntersection
