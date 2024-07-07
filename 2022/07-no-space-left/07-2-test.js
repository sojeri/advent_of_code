const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./07-2-solution')

describe('07-2-solution', () => {
    describe('solution', () => {
        it('should return 24_933_642 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/07-no-space-left/example.txt'), 24_933_642)
        })
        it('should return 1_300_850 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/07-no-space-left/input.txt'), 1_300_850)
        })
    })
})
