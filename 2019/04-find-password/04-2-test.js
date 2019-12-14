const assert = require('assert')
let { howManyValidPasswordsInRange } = require('./04-1-solution')
let solution = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('isValid()', () => {
        it('should return true for 112233', () => {
            assert.equal(solution(112233), true)
        })
        it('should return false for 123444', () => {
            assert.equal(solution(123444), false)
        })
        it('should return true for 111122', () => {
            assert.equal(solution(111122), true)
        })
        it('should return false for 111222', () => {
            assert.equal(solution(111222), false)
        })
        it('should return true for 112222', () => {
            assert.equal(solution(112222), true)
        })
    })
    describe('howManyValidPasswordsInRange()', () => {
        it('should return 1419 for puzzle input', () => {
            assert.equal(howManyValidPasswordsInRange(solution), 1419)
        })
    })
})
