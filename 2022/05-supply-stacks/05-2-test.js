const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-2-solution')

describe('05-2-solution', () => {
    describe('solution', () => {
        it('should return "MCD" for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/05-supply-stacks/example.txt'), 'MCD')
        })
        it('should return "RBTWJWMCF" for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/05-supply-stacks/input.txt'), 'RBTWJWMCF')
        })
    })
})
