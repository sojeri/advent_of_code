/**
 * based on a given set of instructions to Easter Bunny HQ, returns the length of the shortest path to get there
 * @param {*} instructions the
 */
function findShortestPath(instructions) {
    let currentLocation = { x: 0, y: 0 }
    let directions = ['north', 'east', 'south', 'west']
    let facing = 0 // directions[0] to be specific

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
                currentLocation.y = currentLocation.y + move
                break
            case 'south':
                currentLocation.y = currentLocation.y - move
                break
            case 'east':
                currentLocation.x = currentLocation.x + move
                break
            case 'west':
                currentLocation.x = currentLocation.x - move
                break
        }
    }

    return Math.abs(currentLocation.x) + Math.abs(currentLocation.y)
}

module.exports = { findShortestPath }
