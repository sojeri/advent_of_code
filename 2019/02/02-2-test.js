const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('solution', () => {
        it('should return ??? for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/02/input.txt')
            assert.equal(result, -1)
        })
    })
})