const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution } = require('./02-password-philosophy-1-solution')

describe('02-password-philosophy-1-solution', () => {
    describe('solution', () => {
        it('should return 2 for example input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/02-password-philosophy/example.txt'), 2)
        })

        it('should return 469 for puzzle input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/02-password-philosophy/input.txt'), 469)
        })
    })
})
