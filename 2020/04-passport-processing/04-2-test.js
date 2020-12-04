const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/04-passport-processing/example-2.txt'), 4)
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/04-passport-processing/input.txt'), -1)
        })
    })
})
