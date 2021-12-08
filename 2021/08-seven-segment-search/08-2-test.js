const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { decodeLine, decodeNumbers, solution } = require('./08-2-solution')

describe('08-2-solution', () => {
    describe('decodeLine', () => {
        it('should return 5323 for example input', () => {
            assert.strictEqual(
                decodeLine('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'),
                5353
            )
        })
    })
    describe('decodeNumbers', () => {
        it('should return expected decoded numbers for example input', () => {
            assert.deepStrictEqual(decodeNumbers('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'), [
                'abcdeg', // 0
                'ab', // 1
                'acdfg', // 2
                'abcdf', // 3
                'abef', // 4
                'bcdef', // 5
                'bcdefg', // 6
                'abd', // 7
                'abcdefg', // 8
                'abcdef', // 9
            ])
        })
    })
    describe('solution', () => {
        it('should return 61229 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/08-seven-segment-search/example.txt'), 61229)
        })
        it('should return 933305 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/08-seven-segment-search/input.txt'), 933305)
        })
    })
})
