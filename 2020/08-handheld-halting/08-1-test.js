const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./08-1-solution')

describe('08-1-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 5 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/08-handheld-halting/example.txt'), 5)
        })
        it('should return 2003 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/08-handheld-halting/input.txt'), 2003)
        })
    })
})
