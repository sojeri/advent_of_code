const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-2-solution')

describe('05-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 12 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/05-hydrothermal-venture/example.txt'), 12)
        })
        it('should return 21373 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/05-hydrothermal-venture/input.txt'), 21373)
        })
    })
})
