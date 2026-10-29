const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution, extractIsoNumber } = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('extractIsoNumber', () => {
        it('should return 222 for `ISO-3210 7654`', () => {
            assert.strictEqual(extractIsoNumber('ISO-3210 7654'), 222)
        })
        it('should return 1_252 for `ISO-8742 2468`', () => {
            assert.strictEqual(extractIsoNumber('ISO-8742 2468'), 1_252)
        })
        it('should return 4 for `ISO-1 1111`', () => {
            assert.strictEqual(extractIsoNumber('ISO-1 1111'), 4)
        })
        it('should return 77 for `ISO-13 777`', () => {
            assert.strictEqual(extractIsoNumber('ISO-13 777'), 77)
        })
        it('should return 1_416 for `ISO-34 140856`', () => {
            assert.strictEqual(extractIsoNumber('ISO-34 140856'), 1_416)
        })
        it('should return 1_158_390 for `ISO-789 2465112`', () => {
            assert.strictEqual(extractIsoNumber('ISO-789 2465112'), 1_158_390)
        })
        it('should return 102 for `ISO-2341 945`', () => {
            assert.strictEqual(extractIsoNumber('ISO-2341 945'), 102)
        })
    })
    describe('solution', () => {
        it('should return 1_161_463 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/03-the-isolation/example2.txt', true),
                1_161_463
            )
        })
        it('should return 22_270_279_208 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/03-the-isolation/input2.txt', true),
                22_270_279_208
            )
        })
    })
})
