const assert = require('assert')
// let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./@@solution')

describe('@@solution', () => {
    describe('solution', () => {
        it('should return -1 for example input', () => {
            assert.strictEqual(solution(), -1)
        })
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(solution, '##/example.txt'), -1)
        // })
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(solution, '##/input.txt'), -1)
        // })
    })
})
