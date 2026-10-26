const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
// const { solution } = require('./024-2-solution')

describe.skip('024-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return -1 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, 'sandbox/024-load-balancing-workers/example.txt'), -1)
        })
        // it('should return -1 for puzzle input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(solution, 'sandbox/024-load-balancing-workers/input.txt'), -1)
        // })
    })
})
