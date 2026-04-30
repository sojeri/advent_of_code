const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { solution, getStatus, hasSslSupport } = require('./07-2-solution')

describe('07-2-solution', () => {
    describe('getStatus', () => {
        it('should return true/true for matched set', () => {
            const matchedAbaResult = getStatus('aba', { bab: true })
            assert.deepEqual(matchedAbaResult, { isValid: true, isMatched: true })
            const matchedBabResult = getStatus('bab', { aba: true })
            assert.deepEqual(matchedBabResult, { isValid: true, isMatched: true })
        })
        it('should return true/false for unmatched valid match', () => {
            const unmatchedAbaResult = getStatus('aba', {})
            assert.deepEqual(unmatchedAbaResult, { isValid: true, isMatched: false })
            const unmatchedBabResult = getStatus('bab', {})
            assert.deepEqual(unmatchedBabResult, { isValid: true, isMatched: false })
            const anotherUnmatchedAbaResult = getStatus('aba', { zaz: true })
            assert.deepEqual(anotherUnmatchedAbaResult, { isValid: true, isMatched: false })
            const anotherUnmatchedBabResult = getStatus('bab', { zaz: true })
            assert.deepEqual(anotherUnmatchedBabResult, { isValid: true, isMatched: false })
        })
        it('should return false/false for invalid match', () => {
            const invalidAbaResult = getStatus('abc', { bab: true })
            assert.deepEqual(invalidAbaResult, { isValid: false, isMatched: false })
            const anotherInvalidAbaResult = getStatus('xyz', { bab: true })
            assert.deepEqual(anotherInvalidAbaResult, { isValid: false, isMatched: false })
        })
    })
    describe('hasSslSupport', () => {
        it('should return true for aba[bab]xyz', () => {
            const result = hasSslSupport('aba[bab]xyz')
            assert.strictEqual(result, true)
        })
        it('should return true for aaa[kek]eke', () => {
            const result = hasSslSupport('aaa[kek]eke')
            assert.strictEqual(result, true)
        })
        it('should return false for xyx[xyx]xyx', () => {
            const result = hasSslSupport('xyx[xyx]xyx')
            assert.strictEqual(result, false)
        })
        it('should return true for zazbz[bzb]cdb', () => {
            const result = hasSslSupport('zazbz[bzb]cdb')
            assert.strictEqual(result, true)
        })
    })
    describe('solution', () => {
        it('should return 0 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/07-internet-protocol-version-seven/example.txt'),
                0
            )
        })
        it('should return 231 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/07-internet-protocol-version-seven/input.txt'),
                231
            )
        })
    })
})
