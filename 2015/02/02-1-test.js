const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { calculatePaperNeeded, calculateTotalPaperForList } = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('calculatePaperNeeded', () => {
        it('should return 58 for 2x3x4', () => {
            assert.equal(calculatePaperNeeded('2x3x4'), 58)
        })

        it('should return 43 for 1x1x10', () => {
            assert.equal(calculatePaperNeeded('1x1x10'), 43)
        })
    })

    describe('calculateTotalPaperForList', () => {
        it('should return 101 for 2x3x4,1x1x10', () => {
            assert.equal(calculateTotalPaperForList(['2x3x4', '1x1x10']), 101)
        })

        it('should return 101 for 2x3x4,1x1x10 as a file', () => {
            let result = runCallbackAgainstFile(calculateTotalPaperForList, '2015/02/example.txt')
            assert.equal(result, 101)
        })

        it('should return 1588178 for puzzle input', () => {
            let result = runCallbackAgainstFile(calculateTotalPaperForList, '2015/02/input.txt')
            assert.equal(result, 1588178)
        })
    })
})
