const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('findBathroomCode', () => {
        it('should return 1985 for example input', () => {
            assert.equal(solution(['ULL', 'RRDDD', 'LURDL', 'UUUUD']), '1985')
        })

        it('should return 45973 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2016/02/input.txt')
            assert.equal(result, 45973)
        })
    })
})
