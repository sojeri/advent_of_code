const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let findClosestIntersection = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('findClosestIntersection', () => {
        it('should return 6 for example input', () => {
            assert.equal(findClosestIntersection(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 6)
        })
        it('should return 159 for example input', () => {
            assert.equal(
                findClosestIntersection(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']),
                159
            )
        })
        it('should return 135 for example input', () => {
            assert.equal(
                findClosestIntersection([
                    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
                    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
                ]),
                135
            )
        })
        it('should return 225 for puzzle input', () => {
            let result = runCallbackAgainstFile(findClosestIntersection, '2019/03-manhattan-wires/input.txt')
            assert.equal(result, 225)
        })
    })
})
