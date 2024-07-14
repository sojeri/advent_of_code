const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./10-1-solution')

describe('10-1-solution', () => {
    describe('solution', () => {
        it('should return 13_140 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/10-cathode-ray-tube/example2.txt'), 13_140)
        })
        it('should return 11_720 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/10-cathode-ray-tube/input.txt'), 11_720)
        })
    })
})
