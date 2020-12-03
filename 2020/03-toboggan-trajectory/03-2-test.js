const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('solution', () => {
        it('should return 336 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/03-toboggan-trajectory/example.txt'), 336)
        })
        it('should return 4355551200 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/03-toboggan-trajectory/input.txt'), 4355551200)
        })
    })
})
