const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./09-1-solution')

describe('09-1-solution', () => {
    describe('solution', () => {
        it('should return 127 for example input', () => {
            const example = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576]
            assert.strictEqual(solution(example, 5), 127)
        })
        it('should return 373803594 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/09-encoding-error/input.txt'), 373803594)
        })
    })
})
