const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./09-2-solution')

describe.only('09-2-solution', () => {
    describe('solution', () => {
        it('should return 1 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/09-rope-bridge/example.txt'), 1)
        })
        it('should return 36 for example2 input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/09-rope-bridge/example2.txt'), 36)
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/09-rope-bridge/input.txt'), -1)
        })
    })
})
