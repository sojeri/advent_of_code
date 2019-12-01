const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-1-solution')

describe('06-1-solution', () => {
    describe('parseSantasPlan', () => {
        it('should return 9 for example input', () => {
            let result = runCallbackAgainstFile(solution.parseSantasPlan, '2015/06/example.txt')
            assert.equal(result, 9)
        })

        it('should return 377891 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution.parseSantasPlan, '2015/06/input.txt')
            assert.equal(result, 377891)
        })
    })

    describe('parseCoord', () => {
        it('should return {x:44,y:600} for "44,600"', () => {
            let coord = solution.parseCoord('44,600')
            assert.equal(coord.x, 44)
            assert.equal(coord.y, 600)
        })
    })

    describe('toggle', () => {
        it('should swap the value', () => {
            let mockGrid = solution.createGrid(3)
            let start = { x: 0, y: 0 }
            let end = { x: 2, y: 2 }
            mockGrid = solution.toggle(mockGrid, start, end)
            assert.equal(mockGrid[0][2], true)
            mockGrid = solution.toggle(mockGrid, start, end)
            assert.equal(mockGrid[0][2], false)
        })
    })

    describe('turnOn', () => {
        it('should set the value to true', () => {
            let mockGrid = solution.createGrid(3)
            let start = { x: 0, y: 0 }
            let end = { x: 2, y: 2 }
            mockGrid = solution.turnOn(mockGrid, start, end)
            assert.equal(mockGrid[0][2], true)
        })
    })

    describe('turnOff', () => {
        it('should set the value to false', () => {
            let mockGrid = solution.createGrid(3)
            let start = { x: 0, y: 0 }
            let end = { x: 2, y: 2 }
            mockGrid = solution.turnOn(mockGrid, start, end)
            mockGrid = solution.turnOff(mockGrid, start, end)
            assert.equal(mockGrid[0][2], false)
        })
    })

    describe('handleInstruction', () => {
        it('should parse and handle a single instruction', () => {
            let mockGrid = solution.createGrid(3)
            mockGrid = solution.handleInstruction(mockGrid, 'toggle 0,0 to 1,2')
            assert.equal(mockGrid[1][2], true)
            assert.equal(mockGrid[2][2], false)
            mockGrid = solution.handleInstruction(mockGrid, 'toggle 0,0 to 2,2')
            assert.equal(mockGrid[1][2], false)
            assert.equal(mockGrid[2][2], true)
            mockGrid = solution.handleInstruction(mockGrid, 'turn off 0,0 to 2,2')
            assert.equal(mockGrid[1][2], false)
            assert.equal(mockGrid[2][2], false)
        })
    })

    describe('countHowManyLightsAreOn', () => {
        it('should count how many trues are in an array of arrays', () => {
            let mockGrid = [
                [false, false],
                [false, false],
            ]
            assert.equal(solution.countHowManyLightsAreOn(mockGrid), 0)
            mockGrid = [
                [true, false],
                [false, true],
            ]
            assert.equal(solution.countHowManyLightsAreOn(mockGrid), 2)
            mockGrid = [
                [true, false, true],
                [false, false, true],
                [false, true, false],
            ]
            assert.equal(solution.countHowManyLightsAreOn(mockGrid), 4)
        })
    })
})
