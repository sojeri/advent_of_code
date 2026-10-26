const assert = require('assert')
let solution = require('./04-1-solution')

describe('04-1-solution', () => {
    describe('isValid()', () => {
        it('should return true for 111111', () => {
            assert.equal(solution.isValid(111111), true)
        })
        it('should return false for 223450', () => {
            assert.equal(solution.isValid(223450), false)
        })
        it('should return false for 123789', () => {
            assert.equal(solution.isValid(123789), false)
        })
        it('should return false for 123788', () => {
            assert.equal(solution.isValid(123789), false)
        })
    })
    describe('howManyValidPasswordsInRange()', () => {
        it('should return 2090 for puzzle input', () => {
            assert.equal(solution.howManyValidPasswordsInRange(), 2090)
        })
    })
})
