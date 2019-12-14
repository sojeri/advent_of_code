const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./08-1-solution')

describe('08-1-solution', () => {
    describe('solution', () => {
        it('should return 9 for 000098765000098765000222111 3x3', () => {
            assert.equal(solution('000098765000098765000222111', 3, 3), 9)
        })
        it('should return 1 for 123456789012 3x2', () => {
            assert.equal(solution('123456789012', 3, 2), 1)
        })

        it('should return 1703 for puzzle input', () => {
            let inputWrapper = spaceImage => {
                return solution(spaceImage, 25, 6)
            }

            let result = runCallbackAgainstFile(inputWrapper, '2019/08-parse-space-image/input.txt')
            assert.equal(result, 1703)
        })
    })
})
