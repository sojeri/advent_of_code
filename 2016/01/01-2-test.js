const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should throw 4 for R8,R4,R4,R8', () => {
            assert.throws(
                () => {
                    solution(['R8', 'R4', 'R4', 'R8'])
                },
                Error,
                4
            )
        })

        it('should throw 165 for puzzle input', () => {
            assert.throws(
                () => {
                    runCallbackAgainstFile(solution, '2016/01/input.txt')
                },
                Error,
                165
            )
        })
    })
})
