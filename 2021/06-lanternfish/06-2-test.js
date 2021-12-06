const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { simulateLanternfish, solution } = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('simulateLanternfish', () => {
        it('should return an object representing 6,0,6,4,5,6,7,8,8 for example input -- at 4 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 4), {
                0: 1,
                1: 0,
                2: 0,
                3: 0,
                4: 1,
                5: 1,
                6: 3,
                7: 1,
                8: 2,
            })
        })
        it('should return an object representing 2,3,2,0,1,2,3,4,4,5 for example input -- at 8 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 8), {
                0: 1,
                1: 1,
                2: 3,
                3: 2,
                4: 2,
                5: 1,
                6: 0,
                7: 0,
                8: 0,
            })
        })
        it('should return an object representing 5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8 for example input -- at 12 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 12), {
                0: 2,
                1: 1,
                2: 0,
                3: 1,
                4: 1,
                5: 4,
                6: 3,
                7: 3,
                8: 2,
            })
        })
        it('should return an object representing 1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8 for example input -- at 16 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 16), {
                0: 1,
                1: 4,
                2: 3,
                3: 5,
                4: 3,
                5: 2,
                6: 2,
                7: 0,
                8: 1,
            })
        })
        it('should return an object representing 4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,0,0,1,1,2,4,5,6,6,6,6,7,7,7,8,8,8,8,8 for example input -- at 20 days', () => {
            assert.deepStrictEqual(simulateLanternfish('3,4,3,1,2', 20), {
                0: 3,
                1: 2,
                2: 2,
                3: 1,
                4: 5,
                5: 4,
                6: 9,
                7: 3,
                8: 5,
            })
        })
    })
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        it('should return 26984457539 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/06-lanternfish/example.txt'), 26984457539)
        })
        it('should return 1754000560399 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/06-lanternfish/input.txt'), 1754000560399)
        })
    })
})
