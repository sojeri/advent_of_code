const assert = require('assert')
let { findStepsFromOrigin } = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('findStepsFromOrigin', () => {
        it('should return 0 for input 1', () => {
            assert.equal(findStepsFromOrigin(1), 0)
        })

        it('should return 1 for input 2', () => {
            assert.equal(findStepsFromOrigin(2), 1)
        })

        it('should return 3 for input 10', () => {
            assert.equal(findStepsFromOrigin(10), 3)
        })

        it('should return 3 for input 12', () => {
            assert.equal(findStepsFromOrigin(12), 3)
        })

        it('should return 2 for input 23', () => {
            assert.equal(findStepsFromOrigin(23), 2)
        })

        it('should return 31 for input 1024', () => {
            assert.equal(findStepsFromOrigin(1024), 31)
        })

        it('should return 438 for puzzle input', () => {
            assert.equal(findStepsFromOrigin(265149), 438)
        })
    })
})
