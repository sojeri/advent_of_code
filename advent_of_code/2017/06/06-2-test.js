const assert = require('assert')
let solution = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.equal(solution('0	2	7	0'), 4)
        })

        it('should return 1037 for puzzle input', () => {
            let puzzleInput = '14	0	15	12	11	11	3	5	1	6	8	4	9	1	8	4'
            assert.equal(solution(puzzleInput), 1037)
        })
    })
})
