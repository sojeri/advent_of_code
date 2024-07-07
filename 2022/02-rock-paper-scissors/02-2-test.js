const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('solution', () => {
        it('should return 12 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/02-rock-paper-scissors/example.txt'), 12)
        })
        it('should return 15_457 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/02-rock-paper-scissors/input.txt'), 15_457)
        })
    })
})
