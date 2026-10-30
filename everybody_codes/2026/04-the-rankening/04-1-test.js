const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./04-1-solution')

describe('04-1-solution', () => {
    describe('solution', () => {
        it('should return 27_598 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/example.txt', true),
                27_598
            )
        })
        it('should return 210_236 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/input.txt', true),
                210_236
            )
        })
    })
})
