const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { findShortestPath } = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('findShortestPath', () => {
        it('should return 5 for R2,L3', () => {
            assert.equal(findShortestPath(['R2', 'L3']), 5)
        })

        it('should return 2 for R2,R2,R2', () => {
            assert.equal(findShortestPath(['R2', 'R2', 'R2']), 2)
        })

        it('should return 12 for R5,L5,R5,R3', () => {
            assert.equal(findShortestPath(['R5', 'L5', 'R5', 'R3']), 12)
        })

        it('should return 307 for puzzle input', () => {
            let result = runCallbackAgainstFile(findShortestPath, '2016/01/input.txt')
            assert.equal(result, 307)
        })
    })
})
