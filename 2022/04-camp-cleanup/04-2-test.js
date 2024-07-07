const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/04-camp-cleanup/example.txt'), 4)
        })
        it('should return 895 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/04-camp-cleanup/input.txt'), 895)
        })
    })
})
