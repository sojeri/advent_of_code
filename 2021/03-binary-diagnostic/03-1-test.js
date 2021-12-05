const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-1-solution')

describe.only('03-1-solution', () => {
    describe('solution', () => {
        it('should return 198 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/example.txt'), 198)
        })
        it('should return 4174964 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/input.txt'), 4174964)
        })
    })
})
