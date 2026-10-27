const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should return 28 for example input', () => {
            assert.strictEqual(solution('AxBCDDCAxD'), 28)
        })
        it('should return 28 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/example2.txt',
                    true
                ),
                28
            )
        })
        it('should return 5639 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(
                    solution,
                    'everybody_codes/2024/01-the-battle-for-the-farmlands/input2.txt',
                    true
                ),
                5639
            )
        })
    })
})
