/**
 * calculates the position of the instruction which first directs Santa to enter the basement.
 * full spec: https://adventofcode.com/2015/day/1#part2
 * @param {*} instruction 
 */
function calculateBasementDiscovery(instruction) {
    floor = 0
    if (Array.isArray(instruction)) {
        instruction = instruction[0]
    }

    for (i = 0; i < instruction.length; i++) {
        char = instruction[i]
        floor += (char == '(') ? 1 : -1
        if (floor == -1) {
            return i + 1 // Santa counts like a human, not a computer
        }
    }

    return floor
}

module.exports = calculateBasementDiscovery;