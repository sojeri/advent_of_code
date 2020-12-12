//
/**
 * 
    Action N means to move north by the given value.
    Action S means to move south by the given value.
    Action E means to move east by the given value.
    Action W means to move west by the given value.
    Action L means to turn left the given number of degrees.
    Action R means to turn right the given number of degrees.
    Action F means to move forward by the given value in the direction the ship is currently facing.

    */
const EAST = 'E'
const WEST = 'W'
const NORTH = 'N'
const SOUTH = 'S'
const LEFT = 'L'
const RIGHT = 'R'
const FORWARD = 'F'
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST]
function solution(inputArray) {
    let east = 0
    let north = 0
    let facing = 1 // start facing east
    inputArray.forEach(line => {
        let instr = line[0]
        instr = instr === FORWARD ? DIRECTIONS[facing] : instr
        const distance = Number(line.slice(1))

        switch (instr) {
            case EAST:
                east += distance
                break
            case WEST:
                east -= distance
                break
            case NORTH:
                north += distance
                break
            case SOUTH:
                north -= distance
                break
            case RIGHT:
                facing = (facing + distance / 90) % DIRECTIONS.length
                break
            case LEFT:
                facing = (facing + (360 - distance) / 90) % DIRECTIONS.length
                break
        }
    })

    return Math.abs(east) + Math.abs(north)
}

module.exports = solution
