const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('solution', () => {
        it('should return  6_470 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/example2.txt', true),
                6_470
            )
        })
        it('should return 637_625_652 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/input2.txt', true),
                637_625_652
            )
        })
    })
})
