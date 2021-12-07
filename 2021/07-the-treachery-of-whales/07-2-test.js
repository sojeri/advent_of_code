const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./07-2-solution')

describe('07-2-solution', () => {
    describe('solution', () => {
        it('should return 168 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/07-the-treachery-of-whales/example.txt'), 168)
        })
        it('should return 91638945 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/07-the-treachery-of-whales/input.txt'), 91638945)
        })
    })
})
