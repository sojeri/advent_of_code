const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('solution', () => {
        it('should return 3500 for 1,9,10,3,2,3,11,0,99,30,40,50', () => {
            assert.equal(solution('1,9,10,3,2,3,11,0,99,30,40,50'), 3500)
        })

        it('should return 30 for 1,1,1,4,99,5,6,0,99', () => {
            assert.equal(solution('1,1,1,4,99,5,6,0,99'), 30)
        })

        it('should return 2 for 1,0,0,0,99', () => {
            assert.equal(solution('1,0,0,0,99'), 2)
        })

        it('should return 5482655 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/02-intcode-v1/input.txt')
            assert.equal(result, 5482655)
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
})
