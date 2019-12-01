const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { howManyHousesVisited } = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('howManyHousesVisited', () => {
        it('should return 2 for >', () => {
            assert.equal(howManyHousesVisited('>'), 2)
        })

        it('should return 4 for ^>v<', () => {
            assert.equal(howManyHousesVisited('^>v<'), 4)
        })

        it('should return 2 for ^v^v^v^v^v', () => {
            assert.equal(howManyHousesVisited('^v^v^v^v^v'), 2)
        })

        it('should return 4 for ^>v< as a file', () => {
            let result = runCallbackAgainstFile(howManyHousesVisited, '2015/03/example.txt')
            assert.equal(result, 4)
        })

        it('should return 2565 for puzzle input', () => {
            let result = runCallbackAgainstFile(howManyHousesVisited, '2015/03/input.txt')
            assert.equal(result, 2565)
        })
    })
})
