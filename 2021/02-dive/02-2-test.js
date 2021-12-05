const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('solution', () => {
        it('should return 900 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/02-dive/example.txt'), 900)
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/02-dive/input.txt'), -1)
        })
    })
})
