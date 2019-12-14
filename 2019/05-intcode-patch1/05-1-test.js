const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-1-solution')

describe('05-1-solution', () => {
    describe('solution -- tests from day 2 should still work', () => {
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

    describe("solution -- today's test cases", () => {
        it('should return 1101 for 1101,100,-1,4,0', () => {
            assert.equal(solution('1101,100,-1,4,0'), 1101)
        })

        it('should return 1002 for 1002,4,3,4,33', () => {
            assert.equal(solution('1002,4,3,4,33'), 1002)
        })

        it('should return 15259545 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/05-intcode-patch1/input.txt')
            assert.equal(result, 15259545)
        })
    })
})
