const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./01-1-solution')

describe('01-1-solution', () => {
    describe('solution', () => {
        it('should return 0 for (())', () => {
            assert.equal(solution('(())'), 0)
        })

        it('should return 0 for ()()', () => {
            assert.equal(solution('()()'), 0)
        })

        it('should return 3 for (((', () => {
            assert.equal(solution('((('), 3)
        })

        it('should return 3 for (()(()(', () => {
            assert.equal(solution('(()(()('), 3)
        })

        it('should return 3 for ))(((((', () => {
            assert.equal(solution('))((((('), 3)
        })

        it('should return -1 for ())', () => {
            assert.equal(solution('())'), -1)
        })

        it('should return -1 for ))(', () => {
            assert.equal(solution('))('), -1)
        })

        it('should return -3 for )))', () => {
            assert.equal(solution(')))'), -3)
        })

        it('should return -3 for )())())', () => {
            assert.equal(solution(')())())'), -3)
        })

        it('should return -3 for input )())()) as a file', () => {
            let result = runCallbackAgainstFile(solution, '2015/01/example.txt')
            assert.equal(result, -3)
        })

        it('should return 280 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2015/01/input.txt')
            assert.equal(result, 280)
        })
    })
})
