const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('solution', () => {
        it('should return 1 for )', () => {
            assert.equal(solution(')'), 1)
        })

        it('should return 5 for ()())', () => {
            assert.equal(solution('()())'), 5)
        })

        it('should return 5 for ()())(())()()()()', () => {
            assert.equal(solution('()())(())()()()()'), 5)
        })

        it('should return 1 for input )())()) as a file', () => {
            let result = runCallbackAgainstFile(solution, '2015/01/example.txt')
            assert.equal(result, 1)
        })

        it('should return 1797 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2015/01/input.txt')
            assert.equal(result, 1797)
        })
    })
})
