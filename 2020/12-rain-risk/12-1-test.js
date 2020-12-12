const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./12-1-solution')

describe('12-1-solution', () => {
    describe('solution', () => {
        it('should return 25 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/12-rain-risk/example.txt'), 25)
        })
        it('should return 2280 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/12-rain-risk/input.txt'), 2280)
        })
    })
})
