const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('solution', () => {
        it('should return 6 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/06-custom-customs/example.txt'), 6)
        })
        it('should return 3323 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/06-custom-customs/input.txt'), 3323)
        })
    })
})
