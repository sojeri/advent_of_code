const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./03-1-solution')

describe('03-1-solution', () => {
    describe('solution', () => {
        it('should return 157 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/03-rucksack-reorg/example.txt'), 157)
        })
        it('should return 8_109 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/03-rucksack-reorg/input.txt'), 8_109)
        })
    })
})
