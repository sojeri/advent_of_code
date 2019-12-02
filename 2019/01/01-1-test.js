const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('calculateFuelForItem()', () => {
        it('should return 2 for 12', () => {
            assert.equal(solution.calculateFuelForItem(12), 2)
        })

        it('should return 2 for 14', () => {
            assert.equal(solution.calculateFuelForItem(14), 2)
        })

        it('should return 654 for 1969', () => {
            assert.equal(solution.calculateFuelForItem(1969), 654)
        })

        it('should return 33583 for 100756', () => {
            assert.equal(solution.calculateFuelForItem(100756), 33583)
        })
    })

    describe('calculateFuelForItem()', () => {
        it('should return 658 for 12,14,1969', () => {
            assert.equal(solution.calculateFuelWholeShip([12, 14, 1969]), 658)
        })

        it('should return 658 for 12,14,1969 as a file', () => {
            let result = runCallbackAgainstFile(solution.calculateFuelWholeShip, '2019/01/example.txt')
            assert.equal(result, 658)
        })

        it('should return 3297896 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution.calculateFuelWholeShip, '2019/01/input.txt')
            assert.equal(result, 3297896)
        })
    })
})
