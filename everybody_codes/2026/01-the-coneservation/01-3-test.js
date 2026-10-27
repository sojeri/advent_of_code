const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-3-solution')

describe('01-3-solution', () => {
    describe('solution', () => {
        it('should return 61 for the same example input from part 1 -- as a string', () => {
            assert.strictEqual(solution('3,11,12,16,24,25'), 61)
        })
        it('should return 61 for the same example input from part 1 -- as a file', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/example.txt', true),
                61
            )
        })
        it('should return 749_883 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/input3.txt', true),
                749_883
            )
        })
    })
})
