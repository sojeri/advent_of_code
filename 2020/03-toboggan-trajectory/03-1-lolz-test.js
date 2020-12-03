const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let lolz = require('./03-1-lolz')

describe('03-1-lolz', () => {
    describe('lolz', () => {
        it('should return 7 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(lolz, '2020/03-toboggan-trajectory/example.txt'), 7)
        })
        it('should return 280 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(lolz, '2020/03-toboggan-trajectory/input.txt'), 280)
        })
    })
})
