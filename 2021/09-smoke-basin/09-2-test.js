const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { findBasins } = require('./09-2-solution')

describe('09-2-solution', () => {
    describe('findBasins', () => {
        it('should return 1134 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(findBasins, '2021/09-smoke-basin/example.txt'), 1134)
        })
        it('should return 900900 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(findBasins, '2021/09-smoke-basin/input.txt'), 900900)
        })
    })
})
