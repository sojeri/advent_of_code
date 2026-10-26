const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution } = require('./@@solution')

describe.only('@@solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return -1 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '##/example.txt', true), -1)
        })
        // it('should return -1 for puzzle input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(
        //         solution,
        //         '##/input.txt',
        //         true
        //     ), -1)
        // })
    })
})
