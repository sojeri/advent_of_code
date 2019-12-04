const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('countPossibleTriangles', () => {
        it('should return 1577 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2016/03/input.txt')
            assert.equal(result, 1577)
        })
    })
})
