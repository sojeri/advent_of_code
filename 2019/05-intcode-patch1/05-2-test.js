const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-2-solution')

describe('05-2-solution', () => {
    describe('intcodeComputer -- tests from day 2 should still work', () => {
        it('should return 3500 for 1,9,10,3,2,3,11,0,99,30,40,50', () => {
            assert.equal(solution('1,9,10,3,2,3,11,0,99,30,40,50'), 3500)
        })

        it('should return 30 for 1,1,1,4,99,5,6,0,99', () => {
            assert.equal(solution('1,1,1,4,99,5,6,0,99'), 30)
        })

        it('should return 2 for 1,0,0,0,99', () => {
            assert.equal(solution('1,0,0,0,99'), 2)
        })

        it('throws an error on unrecognized opcode', () => {
            assert.throws(
                () => {
                    solution('4')
                },
                Error,
                'unrecognized Opcode found at postion 0'
            )
        })
    })

    describe("intcodeComputer -- today's part 1 test cases should still work", () => {
        it('should return 1101 for 1101,100,-1,4,0', () => {
            assert.equal(solution('1101,100,-1,4,0'), 1101)
        })

        it('should return 1002 for 1002,4,3,4,33', () => {
            assert.equal(solution('1002,4,3,4,33'), 1002)
        })

        it('should still return 15259545 for puzzle input with part 1 input', () => {
            let inputWrapper = intcodeProgram => {
                return solution(intcodeProgram, 1)
            }

            let result = runCallbackAgainstFile(inputWrapper, '2019/05-intcode-patch1/input.txt')
            assert.equal(result, 15259545)
        })
    })

    describe("intcodeComputer -- today's part 2 test cases", () => {
        it('should return 999 for long example with input 7', () => {
            assert.equal(
                solution(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    7
                ),
                999
            )
        })

        it('should return 1000 for long example with input 8', () => {
            assert.equal(
                solution(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    8
                ),
                1000
            )
        })

        it('should return 1001 for long example with input 9', () => {
            assert.equal(
                solution(
                    '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
                    9
                ),
                1001
            )
        })

        it('should return 1002 for 1002,4,3,4,33', () => {
            assert.equal(solution('1002,4,3,4,33'), 1002)
        })

        it('should return 7616021 for puzzle input', () => {
            let inputWrapper = intcodeProgram => {
                return solution(intcodeProgram, 5 /* stated puzzle input */)
            }

            let result = runCallbackAgainstFile(inputWrapper, '2019/05-intcode-patch1/input.txt')
            assert.equal(result, 7616021)
        })
    })
})
