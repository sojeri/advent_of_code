const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./10-1-solution')

describe('10-1-solution', () => {
    describe('solution', () => {
        it('should return 35 for the smaller example input', () => {
            assert.strictEqual(solution([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]), 35)
        })
        it('should return 220 for the larger example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/10-adapter-array/example.txt'), 220)
        })
        it('should return 2376 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/10-adapter-array/input.txt'), 2376)
        })
    })
})
