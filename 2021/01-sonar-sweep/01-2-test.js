const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 5 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/01-sonar-sweep/example.txt'), 5)
        })
        it('should return 1743 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/01-sonar-sweep/input.txt'), 1743)
        })
    })
})
