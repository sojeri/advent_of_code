const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { exampleIntcodeComputerUsage, getIntcodeComputer, loadProgram, runProgram } = require('./intcodeComputer')

describe.only('incodeComputer module', () => {
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
