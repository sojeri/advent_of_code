const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./02-2-solution')

describe.only('02-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 42 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2024/02-the-runes-of-power/example2.txt', true),
                42
            )
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2024/02-the-runes-of-power/input2.txt', true),
                -1
            )
        })
    })
})
