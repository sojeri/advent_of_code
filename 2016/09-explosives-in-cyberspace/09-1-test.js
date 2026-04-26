const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { decodeString, fullyDecodeString, solution } = require('./09-1-solution')

describe('09-1-solution', () => {
    describe('decodeString -- single pass', () => {
        // key test cases
        it('should return `ABCBCD(2x2)EFG` for `A(2x2)BCD(2x2)EFG`', () => {
            const result = decodeString('A(2x2)BCD(2x2)EFG').decoded
            assert.strictEqual(result, 'ABCBCD(2x2)EFG')
        })
        // included for complete comparison with fullyDecodeString
        it('should return `ADVENT` for `ADVENT`', () => {
            const result = decodeString('ADVENT').decoded
            assert.strictEqual(result, 'ADVENT')
        })
        it('should return `ABBBBBC` for `A(1x5)BC`', () => {
            const result = decodeString('A(1x5)BC').decoded
            assert.strictEqual(result, 'ABBBBBC')
        })
        it('should return `XYZXYZXYZ` for `(3x3)XYZ`', () => {
            const result = decodeString('(3x3)XYZ').decoded
            assert.strictEqual(result, 'XYZXYZXYZ')
        })
        it('should return `(1x3)A` for `(6x1)(1x3)A`', () => {
            const result = decodeString('(6x1)(1x3)A').decoded
            assert.strictEqual(result, '(1x3)A')
        })
        it('should return `X(3x3)ABC(3x3)ABCY` for `X(8x2)(3x3)ABCY`', () => {
            const result = decodeString('X(8x2)(3x3)ABCY').decoded
            assert.strictEqual(result, 'X(3x3)ABC(3x3)ABCY')
        })
    })
    describe('fullyDecodeString -- multiple passes', () => {
        // key test case for multiple passes
        it('should return `ABCBCDEFEFG` for `A(2x2)BCD(2x2)EFG`', () => {
            const result = fullyDecodeString('A(2x2)BCD(2x2)EFG')
            assert.strictEqual(result, 'ABCBCDEFEFG')
        })
        // full puzzle example cases
        it('should return `ADVENT` for `ADVENT`', () => {
            const result = fullyDecodeString('ADVENT')
            assert.strictEqual(result, 'ADVENT')
        })
        it('should return `ABBBBBC` for `A(1x5)BC`', () => {
            const result = fullyDecodeString('A(1x5)BC')
            assert.strictEqual(result, 'ABBBBBC')
        })
        it('should return `XYZXYZXYZ` for `(3x3)XYZ`', () => {
            const result = fullyDecodeString('(3x3)XYZ')
            assert.strictEqual(result, 'XYZXYZXYZ')
        })
        it('should return `(1x3)A` for `(6x1)(1x3)A`', () => {
            const result = fullyDecodeString('(6x1)(1x3)A')
            assert.strictEqual(result, '(1x3)A')
        })
        it('should return `X(3x3)ABC(3x3)ABCY` for `X(8x2)(3x3)ABCY`', () => {
            const result = fullyDecodeString('X(8x2)(3x3)ABCY')
            assert.strictEqual(result, 'X(3x3)ABC(3x3)ABCY')
        })
    })
    describe('solution', () => {
        it('should return 11 for [`A(2x2)BCD(2x2)EFG`]', () => {
            assert.strictEqual(solution(['A(2x2)BCD(2x2)EFG']), 11)
        })
        it('should return 97714 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/09-explosives-in-cyberspace/input.txt'), 97714)
        })
    })
})
