const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution, getVisibleFromRight } = require('./08-2-solution')
describe('08-2-solution', () => {
    describe('getVisibleFromRight', () => {
        it('should return [2,1,1,1,0] for "30373"', () => {
            const expected = [2, 1, 1, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['30373'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
        it('should return [1,1,2,1,0] for "25512"', () => {
            const expected = [1, 1, 2, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['25512'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
        it('should return [4,3,1,1,0] for "65332"', () => {
            const expected = [4, 3, 1, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['65332'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
        it('should return [1,1,2,1,0] for "33549"', () => {
            const expected = [1, 1, 2, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['33549'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
        it('should return [1,2,1,1,0] for "35390"', () => {
            const expected = [1, 2, 1, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['35390'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
        it('should return [9,8,1,6,5,1,1,2,1,0] for "9856533420"', () => {
            const expected = [9, 8, 1, 6, 5, 1, 1, 2, 1, 0]
            const yMax = 0
            const xMax = expected.length - 1
            const resultMatrix = getVisibleFromRight(['9856533420'], xMax, yMax)
            const actual = resultMatrix[yMax]
            assert.deepEqual(expected, actual)
        })
    })
    describe('solution', () => {
        it('should return 8 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/08-tree-house/example.txt'), 8)
        })
        it('should return 199_272 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/08-tree-house/input.txt'), 199_272)
        })
    })
})
