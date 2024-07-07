const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-2-solution')

describe('03-2-solution', () => {
    describe('solution', () => {
        it('should return 70 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/03-rucksack-reorg/example.txt'), 70)
        })
        it('should return 2_738 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/03-rucksack-reorg/input.txt'), 2_738)
        })
    })
})
