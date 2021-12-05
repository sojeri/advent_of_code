const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-1-solution')

describe('05-1-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 5 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/05-hydrothermal-venture/example.txt'), 5)
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/05-hydrothermal-venture/input.txt'), -1)
        })
    })
})
