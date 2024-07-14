const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./08-1-solution')

describe('08-1-solution', () => {
    describe('solution', () => {
        it('should return 21 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/08-tree-house/example.txt'), 21)
        })
        it('should return 1_794 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/08-tree-house/input.txt'), 1_794)
        })
    })
})
