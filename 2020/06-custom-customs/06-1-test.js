const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-1-solution')

describe('06-1-solution', () => {
    describe('solution', () => {
        it('should return 11 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/06-custom-customs/example.txt'), 11)
        })
        it('should return 6530 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/06-custom-customs/input.txt'), 6530)
        })
    })
})
