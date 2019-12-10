const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./09-1-solution')

describe('09-1-solution', () => {
    describe('solution', () => {
        it('should return 2436480432 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/09/input.txt')
            assert.equal(result, 2436480432)
        })
    })
})
