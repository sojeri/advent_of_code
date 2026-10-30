const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./04-3-solution')

describe('04-3-solution', () => {
    describe('solution', () => {
        it('should return 2_998 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/example2.txt', true),
                2_998
            )
        })
        it('should return 3_004 for another example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/example3.txt', true),
                3_004
            )
        })
        it('should return 6_232_480 for the long example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/example4.txt', true),
                6_232_480
            )
        })
        it('should return 6_364_329 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/04-the-rankening/input3.txt', true),
                6_364_329
            )
        })
    })
})
