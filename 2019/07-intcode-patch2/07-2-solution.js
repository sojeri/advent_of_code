let {
    addInput,
    getIntcodeComputer,
    loadProgram,
    runProgram,
    PAUSE_EXECUTION_MARKER,
    PROCESS_TERMINATED_MARKER,
} = require('../intcode-computer')
let { findMaxThrust } = require('./07-1-solution')

let _computers = {}
function getComputer(name, input, program) {
    if (program) {
        let computer = getIntcodeComputer(true)
        loadProgram(computer, program, input)
        _computers[name] = computer
        return computer
    }

    addInput(_computers[name], input)
    return _computers[name]
}

function calculateThrust(phaseCodes, program) {
    let result = 0

    // init computers & start execution
    phaseCodes.forEach(c => {
        let computer = getComputer(c, [c, result], program)
        result = runProgram(computer)
        if (result == PAUSE_EXECUTION_MARKER) {
            result = computer.output
        } else if (result == PROCESS_TERMINATED_MARKER) {
            result = computer.output
        }
    })

    // continue looping until all 5 have exited
    let c = 0
    while (true) {
        let computerName = phaseCodes[c]
        let computer = getComputer(computerName, result)
        result = runProgram(computer)

        if (result == PAUSE_EXECUTION_MARKER) {
            result = computer.output
        } else if (result == PROCESS_TERMINATED_MARKER) {
            result = computer.output
            if (c == 4) {
                return result
            }
        }

        c = (c + 1) % 5
    }
}

function solution(program) {
    return findMaxThrust(program, calculateThrust, 5, 9)
}

module.exports = solution
