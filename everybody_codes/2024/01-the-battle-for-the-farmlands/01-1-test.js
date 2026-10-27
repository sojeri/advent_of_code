const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 5 for example input', () => {
            assert.strictEqual(solution('ABBAC'), 5)
        })
        it('should return 5 for example input as file', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/example.txt',
                    true
                ),
                5
            )
        })
        it('should return 1354 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/input.txt',
                    true
                ),
                1354
            )
        })
    })
})
