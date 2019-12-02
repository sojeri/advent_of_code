/**
 * based on a given set of instructions to Easter Bunny HQ, returns the length of the shortest path to get there
 * @param {*} instructions the
 */
function findShortestPath(instructions) {
    let currentLocation = { x: 0, y: 0 }
    let directions = ['north', 'east', 'south', 'west']
    let facing = 0 // directions[0] to be specific
    let seen = {}

    let moveBlocks = (axis, modifier, stop) => {
        for (let s = 1; s <= stop; s++) {
            currentLocation[axis] = currentLocation[axis] + modifier
            let coord = `${currentLocation.x},${currentLocation.y}`

            if (!seen[coord]) {
                seen[coord] = 1
            } else {
                seen[coord]++
                if (seen[coord] == 2) {
                    throw new Error(Math.abs(currentLocation.x) + Math.abs(currentLocation.y))
                }
            }
        }
    }

    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i]

        // handle turn
        if (instruction[0] == 'R') {
            facing = (facing + 1) % 4
        } else {
            // turn == 'L'
            facing = (facing + 3) % 4 // eg, (south(2) + 3) % 4 == east(1)
        }

        // handle count
        let move = Number(instruction.slice(1))
        switch (directions[facing]) {
            case 'north':
                moveBlocks('y', 1, move)
                break
            case 'south':
                moveBlocks('y', -1, move)
                break
            case 'east':
                moveBlocks('x', 1, move)
                break
            case 'west':
                moveBlocks('x', -1, move)
                break
        }

        let coord = `${currentLocation.x},${currentLocation.y}`
        if (seen[coord] == 2) {
            return Math.abs(currentLocation.x) + Math.abs(currentLocation.y)
        }
    }

    throw new Error('BunnyHQ not found :sad_robot_face:')
}
module.exports = findShortestPath
