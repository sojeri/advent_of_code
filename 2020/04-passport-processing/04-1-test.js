const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./04-1-solution')

describe('04-1-solution', () => {
    describe('solution', () => {
        it('should return 2 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/04-passport-processing/example.txt'), 2)
        })
        it('should return 219 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/04-passport-processing/input.txt'), 219)
        })
    })
})
