const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./08-2-solution')

describe('08-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 8 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/08-handheld-halting/example.txt'), 8)
        })
        it('should return 1984 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/08-handheld-halting/input.txt'), 1984)
        })
    })
})
