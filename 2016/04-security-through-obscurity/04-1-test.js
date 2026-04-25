const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { getLetterCounts, sortLetterCounts, isChecksumValid, isValidRoom, solution } = require('./04-1-solution')

describe('04-1-solution', () => {
    describe('getLetterCounts', () => {
        it('should return a5 b3 xyz1 for aaaaabbbzyx', () => {
            assert.deepEqual(getLetterCounts('aaaaabbbzyx'), {
                a: 5,
                b: 3,
                x: 1,
                y: 1,
                z: 1,
            })
        })
    })
    describe('sortLetterCounts', () => {
        // aaaaa-bbb-z-y-x-123[abxyz]
        it('should return 5 3 1 for thingy', () => {
            const result = sortLetterCounts({
                a: 5,
                b: 3,
                x: 1,
                y: 1,
                z: 1,
            })
            assert.deepEqual(result, {
                5: ['a'],
                3: ['b'],
                1: ['x', 'y', 'z'],
                counts: [5, 3, 1],
            })
        })
    })
    describe('isChecksumValid', () => {
        it('should return true for aaaaa-bbb-z-y-x-123,abxyz', () => {
            assert.strictEqual(isChecksumValid('aaaaabbbzyx', 'abxyz'), true)
        })
    })
    describe('isValidRoom', () => {
        it('should return true for aaaaa-bbb-z-y-x-123[abxyz] input', () => {
            assert.strictEqual(isValidRoom('aaaaa-bbb-z-y-x-123[abxyz]'), true)
        })
        it('should return true for a-b-c-d-e-f-g-h-987[abcde]', () => {
            assert.strictEqual(isValidRoom('a-b-c-d-e-f-g-h-987[abcde]'), true)
        })
        it('should return true for not-a-real-room-404[oarel]', () => {
            assert.strictEqual(isValidRoom('not-a-real-room-404[oarel]'), true)
        })
        it('should return false for totally-real-room-200[decoy]', () => {
            assert.strictEqual(isValidRoom('totally-real-room-200[decoy]'), false)
        })
    })
    describe('solution', () => {
        it('should return 1514 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/04-security-through-obscurity/example.txt'), 1514)
        })
        it('should return -1 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/04-security-through-obscurity/input.txt'), -1)
        })
    })
})
