const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('isPossiblyTriangle', () => {
        it('should return false for 5 10 25', () => {
            assert.equal(solution.isPossiblyTriangle('5 10 25'), false)
        })
        it('should return true for 3 4 5', () => {
            assert.equal(solution.isPossiblyTriangle('3 4 5'), true)
        })
    })

    describe('countPossibleTriangles', () => {
        it('should return 1 for example input', () => {
            assert.equal(solution.countPossibleTriangles(['5 10 25', '3 4 5']), 1)
        })

        it('should return 862 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution.countPossibleTriangles, '2016/03/input.txt')
            assert.equal(result, 862)
        })
    })
})
