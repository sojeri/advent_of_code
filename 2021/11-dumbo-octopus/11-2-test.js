const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution } = require('./11-2-solution')

describe('11-2-solution', () => {
    describe('solution', () => {
        it('should return 195 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/11-dumbo-octopus/example.txt'), 195)
        })
        it('should return 351 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/11-dumbo-octopus/input.txt'), 351)
        })
    })
})
