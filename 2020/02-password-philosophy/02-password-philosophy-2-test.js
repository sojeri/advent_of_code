const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./02-password-philosophy-2-solution')

describe('02-password-philosophy-2-solution', () => {
    describe('solution', () => {
        it('should return 1 for example input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/02-password-philosophy/example.txt'), 1)
        })

        it('should return 267 for puzzle input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/02-password-philosophy/input.txt'), 267)
        })
    })
})
