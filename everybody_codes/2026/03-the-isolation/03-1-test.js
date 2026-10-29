const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution, decodeIsoValue, extractIsoNumber } = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('decodeIsoValue', () => {
        it('should return 8 for `_3_ ISO-8742 2468`', () => {
            assert.strictEqual(
                decodeIsoValue({
                    isoStandard: '8742',
                    encodedValue: '2468',
                    i: 3,
                    size: 3,
                }),
                8
            )
        })
        it('should return 24 for `_2_ ISO-8742 2468`', () => {
            assert.strictEqual(
                decodeIsoValue({
                    isoStandard: '8742',
                    encodedValue: '2468',
                    i: 2,
                    size: 3,
                }),
                24
            )
        })
        it('should return 196 for `_1_ ISO-8742 2468`', () => {
            assert.strictEqual(
                decodeIsoValue({
                    isoStandard: '8742',
                    encodedValue: '2468',
                    i: 1,
                    size: 3,
                }),
                196
            )
        })
        it('should return 1_024 for `_0_ ISO-8742 2468`', () => {
            assert.strictEqual(
                decodeIsoValue({
                    isoStandard: '8742',
                    encodedValue: '2468',
                    i: 0,
                    size: 3,
                }),
                1_024
            )
        })
    })
    describe('extractIsoNumber', () => {
        it('should return 1_252 for `ISO-8742 2468`', () => {
            assert.strictEqual(extractIsoNumber('ISO-8742 2468'), 1_252)
        })
        it('should return 222 for `ISO-3210 7654`', () => {
            assert.strictEqual(extractIsoNumber('ISO-3210 7654'), 222)
        })
        it('should return 4 for `ISO-1111 1111`', () => {
            assert.strictEqual(extractIsoNumber('ISO-1111 1111'), 4)
        })
    })
    describe('solution', () => {
        it('should return 1_478 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/03-the-isolation/example.txt', true),
                1_478
            )
        })
        it('should return 17_526 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/03-the-isolation/input.txt', true),
                17_526
            )
        })
    })
})
