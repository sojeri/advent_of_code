const assert = require('assert')
// let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./@@solution')

describe('@@solution', () => {
    describe('solution', () => {
        it('should return -1 for example input', () => {
            assert.equal(solution(), -1)
        })
        // it('should return -1 for example input', () => {
        //     assert.equal(runCallbackAgainstFile(solution, '##/example.txt'), -1)
        // })
        // it('should return -1 for example input', () => {
        //     assert.equal(runCallbackAgainstFile(solution, '##/input.txt'), -1)
        // })
    })
})
