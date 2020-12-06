const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution, takeHalf, getSeatLocation, getSeatId } = require('./05-1-solution')

describe('05-1-solution', () => {
    describe('getSeatId', () => {
        it('should return 357 for r44 c5', () => {
            assert.strictEqual(getSeatId({ row: 44, column: 5 }), 357)
        })
        it('should return 567 for r70 c7', () => {
            assert.strictEqual(getSeatId({ row: 70, column: 7 }), 567)
        })
        it('should return 119 for r14 c7', () => {
            assert.strictEqual(getSeatId({ row: 14, column: 7 }), 119)
        })
        it('should return 820 for r102 c4', () => {
            assert.strictEqual(getSeatId({ row: 102, column: 4 }), 820)
        })
    })

    describe('takeHalf', () => {
        it('should return half of an even collection', () => {
            const result = takeHalf([0, 1, 2, 3], 'high', 'low', 'high')
            assert.strictEqual(result.length, 2)
        })
        it('should return roughly half of an odd collection', () => {
            const result = takeHalf([0, 1, 2, 3, 4], 'high', 'low', 'high')
            assert.strictEqual(result.length, 2)
        })
        it('should return the top half on request', () => {
            assert.deepEqual(takeHalf([0, 1, 2, 3, 4, 5], 'high', 'low', 'high'), [3, 4, 5])
        })
        it('should return the bottom half on request', () => {
            assert.deepEqual(takeHalf([0, 1, 2, 3, 4, 5], 'low', 'low', 'high'), [0, 1, 2])
        })
    })

    describe('getSeatLocation', () => {
        it('should return r44 c5 for FBFBBFFRLR', () => {
            assert.deepEqual(getSeatLocation('FBFBBFFRLR'), { row: 44, column: 5 })
        })
        it('should return r70 c7 for BFFFBBFRRR', () => {
            assert.deepEqual(getSeatLocation('BFFFBBFRRR'), { row: 70, column: 7 })
        })
        it('should return r14 c7 for FFFBBBFRRR', () => {
            assert.deepEqual(getSeatLocation('FFFBBBFRRR'), { row: 14, column: 7 })
        })
        it('should return r102 c4 for BBFFBBFRLL', () => {
            assert.deepEqual(getSeatLocation('BBFFBBFRLL'), { row: 102, column: 4 })
        })
    })

    describe('solution', () => {
        it('should return 820 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/05-binary-boarding/example.txt'), 820)
        })
        it('should return 933 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/05-binary-boarding/input.txt'), 933)
        })
    })
})
