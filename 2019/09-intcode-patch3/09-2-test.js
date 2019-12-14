const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./09-2-solution')

describe('09-2-solution', () => {
    describe('solution', () => {
        it('should return 45710 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2019/09-intcode-patch3/input.txt')
            assert.equal(result, 45710)
        })
    })
})
