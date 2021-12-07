const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let part1 = require('./07-1-solution')

describe('07-1-solution', () => {
    describe('part1', () => {
        it('should return 37 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(part1, '2021/07-the-treachery-of-whales/example.txt'), 37)
        })
        it('should return 336721 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(part1, '2021/07-the-treachery-of-whales/input.txt'), 336721)
        })
    })
})
