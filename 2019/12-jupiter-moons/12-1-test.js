const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution, trackMovement } = require('./12-1-solution')

function getFreshExampleMoons() {
    return [
        { x: -1, y: 0, z: 2 },
        { x: 2, y: -10, z: -7 },
        { x: 4, y: -8, z: 8 },
        { x: 3, y: 5, z: -1 },
    ]
}

describe('12-1-solution', () => {
    describe('trackMovement', () => {
        it('should move the example moons as expected after 1 time step', () => {
            let result = trackMovement(getFreshExampleMoons(), 1)

            // verify first moon
            assert.equal(2, result[0].x)
            assert.equal(-1, result[0].y)
            assert.equal(1, result[0].z)

            // verify second moon
            assert.equal(3, result[1].x)
            assert.equal(-7, result[1].y)
            assert.equal(-4, result[1].z)

            // verify third moon
            assert.equal(1, result[2].x)
            assert.equal(-7, result[2].y)
            assert.equal(5, result[2].z)

            // verify fourth moon
            assert.equal(2, result[3].x)
            assert.equal(2, result[3].y)
            assert.equal(0, result[3].z)
        })

        it('should move the example moons as expected after 2 time steps', () => {
            let result = trackMovement(getFreshExampleMoons(), 2)

            // verify first moon
            assert.equal(5, result[0].x)
            assert.equal(-3, result[0].y)
            assert.equal(-1, result[0].z)

            // verify second moon
            assert.equal(1, result[1].x)
            assert.equal(-2, result[1].y)
            assert.equal(2, result[1].z)

            // verify third moon
            assert.equal(1, result[2].x)
            assert.equal(-4, result[2].y)
            assert.equal(-1, result[2].z)

            // verify fourth moon
            assert.equal(1, result[3].x)
            assert.equal(-4, result[3].y)
            assert.equal(2, result[3].z)
        })

        it('should move the example moons as expected after 10 time steps', () => {
            let result = trackMovement(getFreshExampleMoons(), 10)

            // verify first moon
            assert.equal(2, result[0].x)
            assert.equal(1, result[0].y)
            assert.equal(-3, result[0].z)

            // verify second moon
            assert.equal(1, result[1].x)
            assert.equal(-8, result[1].y)
            assert.equal(0, result[1].z)

            // verify third moon
            assert.equal(3, result[2].x)
            assert.equal(-6, result[2].y)
            assert.equal(1, result[2].z)

            // verify fourth moon
            assert.equal(2, result[3].x)
            assert.equal(0, result[3].y)
            assert.equal(4, result[3].z)
        })
    })

    describe('solution', () => {
        it('should return 179 for the example input', () => {
            let inputWrapper = fileContents => {
                return solution(fileContents, 10)
            }
            let result = runCallbackAgainstFile(inputWrapper, '2019/12-jupiter-moons/example.txt')
            assert.equal(result, 179)
        })
        it('should return 5517 for the puzzle input', () => {
            let inputWrapper = fileContents => {
                return solution(fileContents)
            }
            let result = runCallbackAgainstFile(inputWrapper, '2019/12-jupiter-moons/input.txt')
            assert.equal(result, 5517)
        })
    })
})
