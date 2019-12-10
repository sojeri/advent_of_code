const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let {
    addInput,
    exampleIntcodeComputerUsage,
    getIntcodeComputer,
    loadProgram,
    runProgram,
    PAUSE_EXECUTION_MARKER,
    PROCESS_TERMINATED_MARKER,
} = require('.')

describe('incodeComputer module', () => {
    describe('runProgram()', () => {
        it('throws an error if a program is not first loaded into memory', () => {
            assert.throws(
                () => {
                    let computer = getIntcodeComputer()
                    runProgram(computer)
                },
                Error,
                'did you forget to load the program into memory?'
            )
        })
    })

    describe('day 9 changes', () => {
        it('should return 1125899906842624 for 104,1125899906842624,99', () => {
            let computer = getIntcodeComputer()
            loadProgram(computer, '104,1125899906842624,99')

            let result = runProgram(computer)
            assert.equal(result, 1125899906842624)
        })

        it('should return a 16 digit number for 1102,34915192,34915192,7,4,7,99,0', () => {
            let computer = getIntcodeComputer()
            loadProgram(computer, '1102,34915192,34915192,7,4,7,99,0')

            let result = runProgram(computer)
            assert.equal(result.toString().length, 16)
        })

        it('should return a quine', () => {
            let computer = getIntcodeComputer(false, true)
            let program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
            loadProgram(computer, program)
            let result = runProgram(computer)
            assert.equal(result.join(','), program)
        })
    })

    describe('input queue behavior', () => {
        it('can take multiple inputs', () => {
            let computer = getIntcodeComputer()
            loadProgram(computer, '3,0,3,1,99', [666, 555])

            // sanity check initial memory state
            assert.equal(computer.memory[0], 3)
            assert.equal(computer.memory[1], 0)

            runProgram(computer)

            // verify final memory state
            assert.equal(computer.memory[0], 666)
            assert.equal(computer.memory[1], 555)
        })

        describe('during synchronous execution', () => {
            it('throws if input opcode is called but no input was passed', () => {
                let computer = getIntcodeComputer()
                loadProgram(computer, '3,0,99')
                assert.throws(() => {
                    runProgram(computer)
                }, Error)
            })
        })

        describe('async execution', () => {
            it('pauses execution when reaching an input opcode if no input is left in the queue', () => {
                let computer = getIntcodeComputer(true)
                loadProgram(computer, '3,0,99')
                let result = runProgram(computer)
                assert.equal(result, PAUSE_EXECUTION_MARKER)
            })

            it('continues execution after getting new input', () => {
                let computer = getIntcodeComputer(true)
                loadProgram(computer, '3,0,4,0,99')
                let result = runProgram(computer)
                assert.equal(result, PAUSE_EXECUTION_MARKER)
                addInput(computer, 666)
                result = runProgram(computer)
                assert.equal(result, PROCESS_TERMINATED_MARKER)
                assert.equal(computer.output, 666)
            })
        })
    })

    describe('backwards compatibility: day 2 tests should still work', () => {
        it('should return 3500 for 1,9,10,3,2,3,11,0,99,30,40,50', () => {
            assert.equal(exampleIntcodeComputerUsage('1,9,10,3,2,3,11,0,99,30,40,50'), 3500)
        })

        it('should return 30 for 1,1,1,4,99,5,6,0,99', () => {
            assert.equal(exampleIntcodeComputerUsage('1,1,1,4,99,5,6,0,99'), 30)
        })

        it('should return 2 for 1,0,0,0,99', () => {
            assert.equal(exampleIntcodeComputerUsage('1,0,0,0,99'), 2)
        })

        it('throws an error on unrecognized opcode', () => {
            assert.throws(
                () => {
                    exampleIntcodeComputerUsage('4')
                },
                Error,
                'unrecognized Opcode found at postion 0'
            )
        })
    })

    describe('backwards compatibility: day 5 tests should still work', () => {
        it('should return 1101 for 1101,100,-1,4,0', () => {
            assert.equal(exampleIntcodeComputerUsage('1101,100,-1,4,0'), 1101)
        })

        it('should return 1002 for 1002,4,3,4,33', () => {
            assert.equal(exampleIntcodeComputerUsage('1002,4,3,4,33'), 1002)
        })

        it('should return 999 for long example with input 7', () => {
            assert.equal(
                exampleIntcodeComputerUsage(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    7
                ),
                999
            )
        })

        it('should return 1000 for long example with input 8', () => {
            assert.equal(
                exampleIntcodeComputerUsage(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    8
                ),
                1000
            )
        })

        it('should return 1001 for long example with input 9', () => {
            assert.equal(
                exampleIntcodeComputerUsage(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    9
                ),
                1001
            )
        })

        it('should still return 15259545 for puzzle input with part 1 input', () => {
            let inputWrapper = intcodeProgram => {
                return exampleIntcodeComputerUsage(intcodeProgram, 1)
            }

            let result = runCallbackAgainstFile(inputWrapper, '2019/05/input.txt')
            assert.equal(result, 15259545)
        })

        it('should return 7616021 for puzzle input with part 2 input', () => {
            let inputWrapper = intcodeProgram => {
                return exampleIntcodeComputerUsage(intcodeProgram, 5 /* stated puzzle input */)
            }

            let result = runCallbackAgainstFile(inputWrapper, '2019/05/input.txt')
            assert.equal(result, 7616021)
        })
    })
})
