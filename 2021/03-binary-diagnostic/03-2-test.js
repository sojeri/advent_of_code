const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-2-solution')

describe.only('03-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return -1 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/example.txt'), -1)
        })
        // it('should return -1 for puzzle input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/input.txt'), -1)
        // })
    })
})
