let { getIntcodeComputer, loadProgram, runProgram } = require('../intcode-computer')

function solution(program) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }

    // load and run puzzle input
    let computer = getIntcodeComputer(false, true)
    loadProgram(computer, program, 2)
    return runProgram(computer)
}

module.exports = solution
