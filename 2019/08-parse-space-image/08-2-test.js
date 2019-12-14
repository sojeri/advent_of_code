const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { prettyPrintResult, solution } = require('./08-2-solution')

describe('08-2-solution', () => {
    describe('solution', () => {
        it('should return "#.. " for 0222112222120000 2x2', () => {
            let result = solution('0222112222120000', 2, 2)
            assert.equal(result[0][0], '#')
            assert.equal(result[0][1], '.')
            assert.equal(result[1][0], '.')
            assert.equal(result[1][1], '#')
        })

        // it('should return ??? for puzzle input', () => {
        //     let inputWrapper = spaceImage => {
        //         return solution(spaceImage, 25, 6)
        //     }

        //     let result = runCallbackAgainstFile(inputWrapper, '2019/08/input.txt')
        //     prettyPrintResult(result)
        //     assert.equal(result, -1)
        // })
    })
})
