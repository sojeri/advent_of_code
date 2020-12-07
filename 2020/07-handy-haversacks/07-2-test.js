const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./07-2-solution')

describe.only('07-2-solution', () => {
    describe('solution', () => {
        it('should return 32 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/07-handy-haversacks/example.txt'), 32)
        })
        it('should return 126 for the other example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/07-handy-haversacks/example-2.txt'), 126)
        })
        it('should return 89084 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/07-handy-haversacks/input.txt'), 89084)
        })
    })
})
