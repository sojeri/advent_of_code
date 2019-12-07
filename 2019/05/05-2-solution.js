let { exampleIntcodeComputerUsage } = require('../intcode-computer')

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/day/5
 * @param {*} program an intcode program consisting of opcodes, raw values, and storage slots
 * @param {*} input the input to use when encountering opcode 3 (saveInput)
 */
function solution(program, input = 1) {
    return exampleIntcodeComputerUsage(program, input)
}

module.exports = solution
