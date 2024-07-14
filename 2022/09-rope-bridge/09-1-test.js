const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./09-1-solution')

describe('09-1-solution', () => {
    describe('solution', () => {
        it('should return 13 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/09-rope-bridge/example.txt'), 13)
        })
        it('should return 6384 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/09-rope-bridge/input.txt'), 6384)
        })
    })
})
