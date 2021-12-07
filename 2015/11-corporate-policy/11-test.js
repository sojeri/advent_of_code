const assert = require('assert')
const { solution, isValid, isValidDouble, isValidStraight, getNextPossiblePassword } = require('./11-solution')

describe('11-solution', () => {
    describe('isValidDouble', () => {
        it('should return true for aabb', () => {
            assert.strictEqual(isValidDouble('aabb'), true)
        })
        it('should return false for aaaa', () => {
            assert.strictEqual(isValidDouble('aaaa'), false)
        })
        it('should return true for aawfsdkjhgubb', () => {
            assert.strictEqual(isValidDouble('aawfsdkjhgubb'), true)
        })
        it('should return false for aawfsdkjhguaa', () => {
            assert.strictEqual(isValidDouble('aawfsdkjhguaa'), false)
        })
    })
    describe('isValidStraight', () => {
        it('should return true for abc', () => {
            assert.strictEqual(isValidStraight('abc'), true)
        })
        it('should return false for acdf', () => {
            assert.strictEqual(isValidStraight('acdf'), false)
        })
        it('should return true for aawfsdkhij', () => {
            assert.strictEqual(isValidStraight('aawfsdkhij'), true)
        })
    })
    describe('isValid', () => {
        it('should return true for aabasdfjhbvxcbabcc', () => {
            assert.strictEqual(isValid('aabbabcc'), true)
        })
        it('should return true for aabbabcc', () => {
            assert.strictEqual(isValid('aabbabcc'), true)
        })
        it('should return true for aabbabc', () => {
            assert.strictEqual(isValid('aabbabc'), true)
        })
        it('should return false for aabbabci', () => {
            assert.strictEqual(isValid('aabbabci'), false)
        })
        it('should return false for aabbabco', () => {
            assert.strictEqual(isValid('aabbabco'), false)
        })
        it('should return false for aabbabcl', () => {
            assert.strictEqual(isValid('aabbabcl'), false)
        })
        it('should return false for aabb', () => {
            assert.strictEqual(isValid('aabb'), false)
        })
        it('should return false for abc', () => {
            assert.strictEqual(isValid('abc'), false)
        })
    })
    describe('getNextPossiblePassword', () => {
        it('should return aab for aaa', () => {
            assert.deepStrictEqual(getNextPossiblePassword(['a', 'a', 'a'], 2), ['a', 'a', 'b'])
        })
        it('should return aba for aaz', () => {
            assert.deepStrictEqual(getNextPossiblePassword(['a', 'a', 'z'], 2), ['a', 'b', 'a'])
        })
        it('should return baa for azz', () => {
            assert.deepStrictEqual(getNextPossiblePassword(['a', 'z', 'z'], 2), ['b', 'a', 'a'])
        })
    })
    describe('solution', () => {
        it('should return abcdffaa for abcdefgh', () => {
            assert.strictEqual(solution('abcdefgh'), 'abcdffaa')
        })
        it('should return ghjaabcc for ghijklmn', () => {
            assert.strictEqual(solution('ghijklmn'), 'ghjaabcc')
        })
        it('should return vzbxxyzz for puzzle input (vzbxkghb)', () => {
            assert.strictEqual(solution('vzbxkghb'), 'vzbxxyzz')
        })
    })
})
