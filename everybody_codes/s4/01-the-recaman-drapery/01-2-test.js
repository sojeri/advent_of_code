const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution, findLastPosition } = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('findLastPosition', () => {
        it('should return 21 for `1,2,3,4,5,6,7,8,9`', () => {
            assert.strictEqual(findLastPosition('1,2,3,4,5,6,7,8,9'), 21)
        })
        it('should return 101 for `1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30`', () => {
            assert.strictEqual(
                findLastPosition('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30'),
                101
            )
        })
        it('should return 5 for `1,1,1,1,1`', () => {
            assert.strictEqual(findLastPosition('1,1,1,1,1'), 5)
        })
        it('should return 13 for `5,1,2,3,4,5,1,2,3,4`', () => {
            assert.strictEqual(findLastPosition('5,1,2,3,4,5,1,2,3,4'), 13)
        })
        it('should return 12 for `2,1,1,2,1,1,2,1,1,2,1,1`', () => {
            assert.strictEqual(findLastPosition('2,1,1,2,1,1,2,1,1,2,1,1'), 12)
        })
        it('should return 13 for `5,1,2,1,2,7,1,2,1,2,7,1,2,1,2`', () => {
            assert.strictEqual(findLastPosition('5,1,2,1,2,7,1,2,1,2,7,1,2,1,2'), 13)
        })
    })
    describe('solution', () => {
        it('should return 122 for example input 1/2', () => {
            assert.strictEqual(
                solution([
                    '1,2,3,4,5,6,7,8,9',
                    '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
                ]),
                122
            )
        })
        it('should return 43 for example input 2/2', () => {
            assert.strictEqual(
                solution([
                    '1,1,1,1,1',
                    '5,1,2,3,4,5,1,2,3,4',
                    '2,1,1,2,1,1,2,1,1,2,1,1',
                    '5,1,2,1,2,7,1,2,1,2,7,1,2,1,2',
                ]),
                43
            )
        })
        it('should return 165 for combined example input -- as file', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2004/01-the-recaman-drapery/example.txt', true),
                165
            )
        })
        it('should return 32_608 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2004/01-the-recaman-drapery/input2.txt', true),
                32_608
            )
        })
    })
})
