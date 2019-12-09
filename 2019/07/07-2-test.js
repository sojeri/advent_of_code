const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./07-2-solution')

describe.only('07-2-solution', () => {
    describe('solution', () => {
        it('should return 139629729 for example input', () => {
            let result = solution(
                '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5'
            )
            assert.equal(result, 139629729)
        })
        it('should return 18216 for example input', () => {
            let result = solution(
                '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10'
            )
            assert.equal(result, 18216)
        })
        it('should return ??? for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/07/input.txt')
            assert.equal(result, -1)
        })
    })
})
