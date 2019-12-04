const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('findBathroomCode', () => {
        it('should return 5DB3 for example input', () => {
            assert.equal(solution(['ULL', 'RRDDD', 'LURDL', 'UUUUD']), '5DB3')
        })

        it('should return 27CA4 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2016/02/input.txt')
            assert.equal(result, '27CA4')
        })
    })
})
