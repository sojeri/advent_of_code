const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('solution', () => {
        it('should return 7 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/03-toboggan-trajectory/example.txt'), 7)
        })
        it('should return 280 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/03-toboggan-trajectory/input.txt'), 280)
        })
    })
})
