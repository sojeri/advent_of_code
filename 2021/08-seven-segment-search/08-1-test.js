const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./08-1-solution')

describe('08-1-solution', () => {
    describe('solution', () => {
        it('should return 26 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/08-seven-segment-search/example.txt'), 26)
        })
        it('should return 247 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/08-seven-segment-search/input.txt'), 247)
        })
    })
})
