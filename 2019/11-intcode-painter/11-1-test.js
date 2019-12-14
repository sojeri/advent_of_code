const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./11-1-solution')

describe('11-1-solution', () => {
    describe('solution', () => {
        it('should return ??? for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/11-intcode-painter/input.txt', true)
            assert.equal(result, -1)
        })
    })
})
