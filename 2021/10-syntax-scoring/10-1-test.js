const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { getSyntaxScore, solution } = require('./10-1-solution')

describe('10-1-solution', () => {
    describe('getSyntaxScore', () => {
        it('should return 1197 for {([(<{}[<>[]}>{[]{[(<()>', () => {
            assert.strictEqual(getSyntaxScore('{([(<{}[<>[]}>{[]{[(<()>'), 1197)
        })
        it('should return 3 for [[<[([]))<([[{}[[()]]]', () => {
            assert.strictEqual(getSyntaxScore('[[<[([]))<([[{}[[()]]]'), 3)
        })
        it('should return 57 for [{[{({}]{}}([{[{{{}}([]', () => {
            assert.strictEqual(getSyntaxScore('[{[{({}]{}}([{[{{{}}([]'), 57)
        })
        it('should return 3 for [<(<(<(<{}))><([]([]()', () => {
            assert.strictEqual(getSyntaxScore('[<(<(<(<{}))><([]([]()'), 3)
        })
        it('should return 25137 for <{([([[(<>()){}]>(<<{{', () => {
            assert.strictEqual(getSyntaxScore('<{([([[(<>()){}]>(<<{{'), 25137)
        })
        it('should return 0 for [({(<(())[]>[[{[]{<()<>>', () => {
            assert.strictEqual(getSyntaxScore('[({(<(())[]>[[{[]{<()<>>'), 0)
        })
        it('should return 0 for (((({<>}<{<{<>}{[]{[]{}', () => {
            assert.strictEqual(getSyntaxScore('(((({<>}<{<{<>}{[]{[]{}'), 0)
        })
        it('should return 0 for  <{([{{}}[<[[[<>{}]]]>[]]', () => {
            assert.strictEqual(getSyntaxScore('<{([{{}}[<[[[<>{}]]]>[]]'), 0)
        })
    })
    describe('solution', () => {
        it('should return 26397 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/10-syntax-scoring/example.txt'), 26397)
        })
        it('should return 296535 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/10-syntax-scoring/input.txt'), 296535)
        })
    })
})
