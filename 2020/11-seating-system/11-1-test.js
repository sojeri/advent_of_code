const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./11-1-solution')

describe('11-1-solution', () => {
    describe('solution', () => {
        it('should return 37 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/11-seating-system/example.txt'), 37)
        })
        it('should return 2183 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/11-seating-system/input.txt'), 2183)
        })
    })
})
