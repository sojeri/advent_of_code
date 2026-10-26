let { getIntcodeComputer, loadProgram, runProgram } = require('../intcode-computer')

function calculateThrust(phaseCodes, program) {
    let result = 0

    // init computers & start execution
    phaseCodes.forEach(c => {
        let computer = getIntcodeComputer()
        loadProgram(computer, program, [c, result])
        result = runProgram(computer)
    })

    return result
}

function findMaxThrust(program, calculateThrustCb, phaseCodesStart = 0, phaseCodesEnd = 4) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }

    let maxFinalOutput
    let phasesToProduceMaxFinalOutput

    for (let a = phaseCodesStart; a <= phaseCodesEnd; a++) {
        // handle phases must be unique
        let seen = {}
        seen[a] = true

        for (let b = phaseCodesStart; b <= phaseCodesEnd; b++) {
            // handle phases must be unique
            if (seen[b]) {
                continue
            }
            seen[b] = true

            for (let c = phaseCodesStart; c <= phaseCodesEnd; c++) {
                // handle phases must be unique
                if (seen[c]) {
                    continue
                }
                seen[c] = true

                for (let d = phaseCodesStart; d <= phaseCodesEnd; d++) {
                    // handle phases must be unique
                    if (seen[d]) {
                        continue
                    }
                    seen[d] = true

                    for (let e = phaseCodesStart; e <= phaseCodesEnd; e++) {
                        // handle phases must be unique
                        if (seen[e]) {
                            continue
                        }
                        seen[e] = true

                        let thisMaxThrust = calculateThrustCb([a, b, c, d, e], program)

                        if (maxFinalOutput == undefined || maxFinalOutput < thisMaxThrust) {
                            maxFinalOutput = thisMaxThrust
                            phasesToProduceMaxFinalOutput = [a, b, c, d, e].join(',')
                        }

                        seen[e] = false
                    }

                    seen[d] = false
                }

                seen[c] = false
            }

            seen[b] = false
        }
    }

    return maxFinalOutput
}

function solution(program) {
    return findMaxThrust(program, calculateThrust)
}

module.exports = {
    solution,
    findMaxThrust,
}
