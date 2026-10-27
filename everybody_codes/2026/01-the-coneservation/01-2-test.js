const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should return 9 for the same example input from part 1 -- as a string', () => {
            assert.strictEqual(solution('3,11,12,16,24,25'), 9)
        })
        it('should return 9 for the same example input from part 1 -- as a file', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/example.txt', true),
                9
            )
        })
        it('should return 312 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/input2.txt', true),
                312
            )
        })
    })
})
