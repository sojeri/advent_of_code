const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should return 241861950 for example input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/01-report-repair/example.txt'), 241861950)
        })

        it('should return 203481432 for puzzle input', () => {
            assert.equal(runCallbackAgainstFile(solution, '2020/01-report-repair/input.txt'), -1)
        })
    })
})
