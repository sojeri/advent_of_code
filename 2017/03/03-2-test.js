const assert = require('assert')
let solution = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('solution', () => {
        it('should return 10 for input 6', () => {
            assert.equal(solution(6), 10)
        })

        it('should return 23 for input 20', () => {
            assert.equal(solution(20), 23)
        })

        it('should return 806 for input 800', () => {
            assert.equal(solution(800), 806)
        })

        it('should return 266330 for puzzle input', () => {
            assert.equal(solution(265149), 266330)
        })
    })
})
