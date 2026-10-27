const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 11 for example input as a string', () => {
            assert.strictEqual(solution('3,11,12,16,24,25'), 11)
        })
        it('should return 11 for example input as a file', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/example.txt', true),
                11
            )
        })
        it('should return 1_292 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/01-the-coneservation/input.txt', true),
                1_292
            )
        })
    })
})
