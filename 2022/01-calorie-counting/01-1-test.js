const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 24_000 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/01-calorie-counting/example.txt'), 24_000)
        })
        it('should return 73_211 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/01-calorie-counting/input.txt'), 73_211)
        })
    })
})
