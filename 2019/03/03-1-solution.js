let seen
let knownIntersections
let currentLocation

function moveBlocks(axis, modifier, stop, name) {
    for (let start = 1; start <= stop; start++) {
        currentLocation[axis] = currentLocation[axis] + modifier
        let coord = `${currentLocation.x},${currentLocation.y}`

        if (!seen[coord]) {
            seen[coord] = []
        }

        if (seen[coord].indexOf(name) == -1) {
            seen[coord].push(name)

            if (seen[coord].length == 2) {
                knownIntersections.push(Math.abs(currentLocation.x) + Math.abs(currentLocation.y))
            }
        }
    }
}

function findClosestIntersection(wires) {
    seen = {}
    knownIntersections = []

    wires.forEach((wireInstructions, wireName) => {
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

    let min = knownIntersections[0]
    knownIntersections.forEach(k => {
        min = min < k ? min : k
    })

    return min
}

module.exports = findClosestIntersection
