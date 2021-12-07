const assert = require('assert')
const { solution, looper, findLookSay } = require('./10-solution')

describe.only('10-solution', () => {
    describe('findLookSay', () => {
        it('should return 11 for input 1', () => {
            assert.strictEqual(findLookSay('1').join(''), '11')
        })
        it('should return 21 for input 11', () => {
            assert.strictEqual(findLookSay('11').join(''), '21')
        })
        it('should return 1211 for input 21', () => {
            assert.strictEqual(findLookSay('21').join(''), '1211')
        })
        it('should return 111221 for input 1211', () => {
            assert.strictEqual(findLookSay('1211').join(''), '111221')
        })
    })
    describe('looper', () => {
        it('should return 111221 for example input (1,4)', () => {
            assert.deepStrictEqual(looper('1', 4), [1, 1, 1, 2, 2, 1])
        })
        it('should return 312211 for example input (1,5)', () => {
            assert.deepStrictEqual(looper('1', 5), [3, 1, 2, 2, 1, 1])
        })
    })
    describe('solution', () => {
        it('should return 6 for example input (1,5)', () => {
            assert.strictEqual(solution('1', 5), 6)
        })
        it('should return 329356 for PART ONE puzzle input (3113322113,40)', () => {
            assert.strictEqual(solution('3113322113', 40), 329356)
        })
        it('should return 4666278 for PART TWO puzzle input (3113322113,***50***)', () => {
            assert.strictEqual(solution('3113322113', 50), 4666278)
        })
    })
})
