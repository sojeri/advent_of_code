/**
 * calculates the floor Santa needs to go to given a set of instructions.
 * full spec: https://adventofcode.com/2015/day/1
 * @param {*} instruction
 */
function calculateFloor(instruction) {
    // '(' = +
    // ')' = -
    floor = 0
    if (Array.isArray(instruction)) {
        instruction = instruction[0]
    }

    for (i = 0; i < instruction.length; i++) {
        char = instruction[i]
        floor += char == '(' ? 1 : -1
    }

    return floor
}

module.exports = calculateFloor
