const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let findShortestDistance = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('solution', () => {
        it('should return 30 for example input', () => {
            assert.equal(findShortestDistance(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 30)
        })
        it('should return 610 for example input', () => {
            assert.equal(
                findShortestDistance(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']),
                610
            )
        })
        it('should return 410 for example input', () => {
            assert.equal(
                findShortestDistance([
                    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
                    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
                ]),
                410
            )
        })
        it('should return 35194 for puzzle input', () => {
            let result = runCallbackAgainstFile(findShortestDistance, '2019/03-manhattan-wires/input.txt')
            assert.equal(result, 35194)
        })
    })
})
