const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./02-1-solution')

describe.only('02-1-solution', () => {
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2024/02-the-runes-of-power/example.txt', true),
                4
            )
        })
        it('should return 30 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2024/02-the-runes-of-power/input.txt', true),
                30
            )
        })
    })
})
