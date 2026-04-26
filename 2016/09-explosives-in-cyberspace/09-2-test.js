const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { solution, lazyArgsDecode } = require('./09-2-solution')

describe('09-2-solution', () => {
    describe('lazyArgsDecode', () => {
        // key test cases
        it('should return 20 for `X(8x2)(3x3)ABCY`', () => {
            const result = lazyArgsDecode('X(8x2)(3x3)ABCY')
            assert.strictEqual(result, 20)
        })
        it('should return 3 for `(6x1)(1x3)A`', () => {
            const result = lazyArgsDecode('(6x1)(1x3)A')
            assert.strictEqual(result, 3)
        })
        it('should return 241_920 for `(27x12)(20x12)(13x14)(7x10)(1x12)A`', () => {
            const result = lazyArgsDecode('(27x12)(20x12)(13x14)(7x10)(1x12)A')
            assert.strictEqual(result, 241_920)
        })
        it('should return 445 for `(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN`', () => {
            const result = lazyArgsDecode('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN')
            assert.strictEqual(result, 445)
        })
        // included for complete comparison with part 1
        it('should return 11 for `A(2x2)BCD(2x2)EFG`', () => {
            const result = lazyArgsDecode('A(2x2)BCD(2x2)EFG')
            assert.strictEqual(result, 11)
        })
        it('should return 6 for `ADVENT`', () => {
            const result = lazyArgsDecode('ADVENT')
            assert.strictEqual(result, 6)
        })
        it('should return 7 for `A(1x5)BC`', () => {
            const result = lazyArgsDecode('A(1x5)BC')
            assert.strictEqual(result, 7)
        })
        it('should return 9 for `(3x3)XYZ`', () => {
            const result = lazyArgsDecode('(3x3)XYZ')
            assert.strictEqual(result, 9)
        })
    })
    describe('solution', () => {
        it('should return 10_762_972_461 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/09-explosives-in-cyberspace/input.txt'),
                10_762_972_461
            )
        })
    })
})
