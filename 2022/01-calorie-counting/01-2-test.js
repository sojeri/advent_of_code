const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should return 45_000 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/01-calorie-counting/example.txt'), 45_000)
        })
        it('should return 213_958 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/01-calorie-counting/input.txt'), 213_958)
        })
    })
})
