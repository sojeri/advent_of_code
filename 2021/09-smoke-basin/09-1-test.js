const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { findLowPoints, solution } = require('./09-1-solution')

describe('09-1-solution', () => {
    describe('findLowPoints', () => {
        it('should return [15, [1, 0, 5, 5] for example input', () => {
            assert.deepStrictEqual(runCallbackAgainstFile(findLowPoints, '2021/09-smoke-basin/example.txt'), [
                15,
                [1, 0, 5, 5],
            ])
        })
    })
    describe('solution', () => {
        it('should return 15 for example input', () => {
            assert.deepStrictEqual(runCallbackAgainstFile(solution, '2021/09-smoke-basin/example.txt'), 15)
        })
        it('should return 439 for puzzle input', () => {
            assert.deepStrictEqual(runCallbackAgainstFile(solution, '2021/09-smoke-basin/input.txt'), 439)
        })
    })
})
