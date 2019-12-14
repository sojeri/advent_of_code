const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('solution', () => {
        it('should return 4967 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/02-intcode-v1/input.txt')
            assert.equal(result, 4967)
        })
    })
})
