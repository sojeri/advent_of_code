const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 514579 for example input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/01-report-repair/example.txt'), 514579)
        })

        it('should return 877971 for puzzle input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/01-report-repair/input.txt'), -1)
        })
    })
})
