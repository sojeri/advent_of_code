let { getIntcodeComputer, loadProgram, runProgram } = require('../intcode-computer')

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

    // arrange computer
    let computer = getIntcodeComputer()
    loadProgram(computer, program)

    if (is1202) {
        computer.memory[1] = noun
        computer.memory[2] = verb
    }

    return runProgram(computer)
}

module.exports = solution
