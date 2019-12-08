let { getIntcodeComputer, loadProgram, runProgram } = require('../intcode-computer')

function solution(program) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }

    let computer = getIntcodeComputer()
    let maxFinalOutput
    let phasesToProduceMaxFinalOutput

    for (let a = 0; a <= 4; a++) {
        // handle phases must be unique
        let seen = {}
        seen[a] = true

        loadProgram(computer, program, [a, 0])
        let aResult = runProgram(computer)

        for (let b = 0; b <= 4; b++) {
            // handle phases must be unique
            if (seen[b]) {
                continue
            }
            seen[b] = true

            loadProgram(computer, program, [b, aResult])
            let bResult = runProgram(computer)

            for (let c = 0; c <= 4; c++) {
                // handle phases must be unique
                if (seen[c]) {
                    continue
                }
                seen[c] = true

                loadProgram(computer, program, [c, bResult])
                let cResult = runProgram(computer)

                for (let d = 0; d <= 4; d++) {
                    // handle phases must be unique
                    if (seen[d]) {
                        continue
                    }
                    seen[d] = true

                    loadProgram(computer, program, [d, cResult])
                    let dResult = runProgram(computer)

                    for (let e = 0; e <= 4; e++) {
                        // handle phases must be unique
                        if (seen[e]) {
                            continue
                        }
                        seen[e] = true

                        loadProgram(computer, program, [e, dResult])
                        let eResult = runProgram(computer)

                        if (maxFinalOutput == undefined || maxFinalOutput < eResult) {
                            maxFinalOutput = eResult
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

module.exports = solution
