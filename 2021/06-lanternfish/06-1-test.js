const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { simulateLanternfish, solution } = require('./06-1-solution')

describe('06-1-solution', () => {
    describe('simulateLanternfish', () => {
        it('should return 6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8 for example input -- at 18 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 18), [
                6,
                0,
                6,
                4,
                5,
                6,
                0,
                1,
                1,
                2,
                6,
                0,
                1,
                1,
                1,
                2,
                2,
                3,
                3,
                4,
                6,
                7,
                8,
                8,
                8,
                8,
            ])
        })
        it('should return 4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,0,0,1,1,2,4,5,6,6,6,6,7,7,7,8,8,8,8,8 for example input -- at 20 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 20), [
                4,
                5,
                4,
                2,
                3,
                4,
                5,
                6,
                6,
                0,
                4,
                5,
                6,
                6,
                6,
                0,
                0,
                1,
                1,
                2,
                4,
                5,
                6,
                6,
                6,
                6,
                7,
                7,
                7,
                8,
                8,
                8,
                8,
                8,
            ])
        })
    })
    describe('solution', () => {
        it('should return 5934 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/06-lanternfish/example.txt'), 5934)
        })
        it('should return 391671 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/06-lanternfish/input.txt'), 391671)
        })
    })
})
