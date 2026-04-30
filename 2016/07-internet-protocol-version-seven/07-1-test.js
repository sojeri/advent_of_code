const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { solution, isABBA, hasTlsSupport } = require('./07-1-solution')

describe('07-1-solution', () => {
    describe('isABBA', () => {
        it('should return false for friday night and the lights are low', () => {
            const result = isABBA('friday night and the lights are low')
            assert.strictEqual(result, false)
        })
        it('should return true for ABBA', () => {
            const result = isABBA('ABBA')
            assert.strictEqual(result, true)
        })
        it('should return true for xyyx', () => {
            const result = isABBA('xyyx')
            assert.strictEqual(result, true)
        })
        it('should return false for ab[a', () => {
            const result = isABBA('ab[a')
            assert.strictEqual(result, false)
        })
        it('should return true for bddb', () => {
            const result = isABBA('bddb')
            assert.strictEqual(result, true)
        })
        it('should return false for aaaa', () => {
            const result = isABBA('aaaa')
            assert.strictEqual(result, false)
        })
    })
    describe('hasTlsSupport', () => {
        it('should return true for ABBA[dancing queen]friday night', () => {
            const result = hasTlsSupport('ABBA[dancing queen]')
            assert.strictEqual(result, true)
        })
        it('should return false for dancing queen[ABBA]', () => {
            const result = hasTlsSupport('dancing queen[ABBA]')
            assert.strictEqual(result, false)
        })
        it('should return false for ABB[dancing queen]A', () => {
            const result = hasTlsSupport('ABB[dancing queen]A')
            assert.strictEqual(result, false)
        })
        it('should return true for abba[mnop]qrst', () => {
            const result = hasTlsSupport('abba[mnop]qrst')
            assert.strictEqual(result, true)
        })
        it('should return false for abcd[bddb]xyyx', () => {
            const result = hasTlsSupport('abcd[bddb]xyyx')
            assert.strictEqual(result, false)
        })
        it('should return false for aaaa[qwer]tyui', () => {
            const result = hasTlsSupport('aaaa[qwer]tyui')
            assert.strictEqual(result, false)
        })
        it('should return true for ioxxoj[asdfgh]zxcvbn', () => {
            const result = hasTlsSupport('ioxxoj[asdfgh]zxcvbn')
            assert.strictEqual(result, true)
        })
        it('should return false for ioxxoj[asdfgh]zxcvbn[abba]', () => {
            const result = hasTlsSupport('ioxxoj[asdfgh]zxcvbn[abba]')
            assert.strictEqual(result, false)
        })
        it('should return true for ioxxojasdfghzxcvbnabba', () => {
            const result = hasTlsSupport('ioxxojasdfghzxcvbnabba')
            assert.strictEqual(result, true)
        })
    })
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/07-internet-protocol-version-seven/example.txt'),
                4
            )
        })
        it('should return 115 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/07-internet-protocol-version-seven/input.txt'),
                115
            )
        })
    })
})
