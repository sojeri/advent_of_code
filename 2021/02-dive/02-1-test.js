const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('solution', () => {
        it('should return 150 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/02-dive/example.txt'), 150)
        })
        it('should return 1698735 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/02-dive/input.txt'), 1698735)
        })
    })
})
