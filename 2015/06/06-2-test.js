const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('parseSantasPlan', () => {
        it('should return 18 for example input', () => {
            let result = runCallbackAgainstFile(
                solution.parseSantasPlan,
                '2015/06/example.txt')
            assert.equal(result, 18)
        })

        it('should return 14110788 for puzzle input', () => {
            let result = runCallbackAgainstFile(
                solution.parseSantasPlan,
                '2015/06/input.txt')
            assert.equal(result, 14110788)
        })
    })

    describe('countTotalLuminosity', () => {
        it('sums numeric values in a grid', () => {
            let mockGrid = [[0, 1, 1], [0, 0, 0], [0, 0, 0]]
            assert.equal(solution.countTotalLuminosity(mockGrid), 2)
            
            mockGrid = [[0, 1, 1], [17, 0, 0], [0, 0, 0]]
            assert.equal(solution.countTotalLuminosity(mockGrid), 19)
        })
    })

    describe('applyInstruction', () => {
        it('will not decrease values below zero', () => {
            let mockGrid = solution.createGrid(3)
            let start = { x: 0, y: 0 }
            let end = { x: 2, y: 2 }
            mockGrid = solution.applyInstruction(mockGrid, start, end, -3)
            assert.equal(mockGrid[0][2], 0)
        })

        it('increments and decrements values as ordered', () => {
            // increment all
            let mockGrid = solution.createGrid(3)
            let start = { x: 0, y: 0 }
            let end = { x: 2, y: 2 }
            mockGrid = solution.applyInstruction(mockGrid, start, end, 3)
            assert.equal(mockGrid[0][2], 3)

            // decrement some
            start = { x: 0, y: 0 }
            end = { x: 1, y: 2 }
            mockGrid = solution.applyInstruction(mockGrid, start, end, -1)
            assert.equal(mockGrid[0][2], 2)
            assert.equal(mockGrid[2][2], 3)

            // increment some
            start = { x: 1, y: 0 }
            end = { x: 2, y: 2 }
            mockGrid = solution.applyInstruction(mockGrid, start, end, 1)
            assert.equal(mockGrid[0][2], 2)
            assert.equal(mockGrid[1][2], 3)
            assert.equal(mockGrid[2][2], 4)
        })
    })
})
