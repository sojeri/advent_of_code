const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-2-solution')

describe.only('05-2-solution', () => {
    describe('solution', () => {
        it('should return 711 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/05-binary-boarding/input.txt'), 711)
        })
    })
})
