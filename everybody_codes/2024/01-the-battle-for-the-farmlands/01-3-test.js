const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-3-solution')

describe('01-3-solution', () => {
    describe('solution', () => {
        it('should return 30 for example input', () => {
            assert.strictEqual(solution('xBxAAABCDxCC'), 30)
        })
        it('should return 30 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/example3.txt',
                    true
                ),
                30
            )
        })
        it('should return 28_180 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/input3.txt',
                    true
                ),
                28_180
            )
        })
    })
})
