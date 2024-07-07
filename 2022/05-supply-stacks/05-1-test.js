const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-1-solution')

describe('05-1-solution', () => {
    describe('solution', () => {
        it('should return "CMZ" for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/05-supply-stacks/example.txt'), 'CMZ')
        })
        it('should return "VRWBSFZWM" for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/05-supply-stacks/input.txt'), 'VRWBSFZWM')
        })
    })
})
