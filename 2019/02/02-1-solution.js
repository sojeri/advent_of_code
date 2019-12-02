/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/day/2
 * @param {*} program the opcode program to run
 * @param {*} noun a value which should replace position 1 in the program before running
 * @param {*} verb a value which should replace position 2 in the program before running
 */
function solution(program, noun = 12, verb = 2) {
    let is1202 = false
    if (Array.isArray(program)) {
        program = program[0]

        // hacky way to handle puzzle input replacement req
        is1202 = true
    }

    program = program.split(',').map(s => {
        return Number(s)
    })
    let here = 0

    if (is1202) {
        program[1] = noun
        program[2] = verb
    }

    while (true) {
        switch (program[here]) {
            case 1:
                first = program[here + 1]
                second = program[here + 2]
                result = program[here + 3]
                program[result] = program[first] + program[second]
                break
            case 2:
                first = program[here + 1]
                second = program[here + 2]
                result = program[here + 3]
                program[result] = program[first] * program[second]
                break
            case 99:
                return program[0]
            default:
                throw new Error(`unrecognized Opcode found at postion ${here}`)
        }

        here += 4
    }
}

module.exports = solution
