const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('solution', () => {
        it('should return 15 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/02-rock-paper-scissors/example.txt'), 15)
        })
        it('should return 12_535 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/02-rock-paper-scissors/input.txt'), 12_535)
        })
    })
})
