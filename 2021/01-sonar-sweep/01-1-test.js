const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 7 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/01-sonar-sweep/example.txt'), 7)
        })
        it('should return 1711 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/01-sonar-sweep/input.txt'), 1711)
        })
    })
})
