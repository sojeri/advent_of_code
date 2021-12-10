const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { getSyntaxScore, solution } = require('./10-2-solution')

describe('10-2-solution', () => {
    describe('getSyntaxScore', () => {
        it('should return 0 for {([(<{}[<>[]}>{[]{[(<()>', () => {
            assert.deepStrictEqual(getSyntaxScore('{([(<{}[<>[]}>{[]{[(<()>'), [0, null])
        })
        it('should return 0 for [[<[([]))<([[{}[[()]]]', () => {
            assert.deepStrictEqual(getSyntaxScore('[[<[([]))<([[{}[[()]]]'), [0, null])
        })
        it('should return 0 for [{[{({}]{}}([{[{{{}}([]', () => {
            assert.deepStrictEqual(getSyntaxScore('[{[{({}]{}}([{[{{{}}([]'), [0, null])
        })
        it('should return 0 for [<(<(<(<{}))><([]([]()', () => {
            assert.deepStrictEqual(getSyntaxScore('[<(<(<(<{}))><([]([]()'), [0, null])
        })
        it('should return 0 for <{([([[(<>()){}]>(<<{{', () => {
            assert.deepStrictEqual(getSyntaxScore('<{([([[(<>()){}]>(<<{{'), [0, null])
        })
        it('should return 288957 for [({(<(())[]>[[{[]{<()<>>', () => {
            assert.deepStrictEqual(getSyntaxScore('[({(<(())[]>[[{[]{<()<>>'), [288957, '}}]])})]'])
        })
        it('should return 5566 for [(()[<>])]({[<{<<[]>>(', () => {
            assert.deepStrictEqual(getSyntaxScore('[(()[<>])]({[<{<<[]>>('), [5566, ')}>]})'])
        })
        it('should return 1480781 for (((({<>}<{<{<>}{[]{[]{}', () => {
            assert.deepStrictEqual(getSyntaxScore('(((({<>}<{<{<>}{[]{[]{}'), [1480781, '}}>}>))))'])
        })
        it('should return 995444 for {<[[]]>}<{[{[{[]{()[[[]', () => {
            assert.deepStrictEqual(getSyntaxScore('{<[[]]>}<{[{[{[]{()[[[]'), [995444, ']]}}]}]}>'])
        })
        it('should return 294 for <{([{{}}[<[[[<>{}]]]>[]]', () => {
            assert.deepStrictEqual(getSyntaxScore('<{([{{}}[<[[[<>{}]]]>[]]'), [294, '])}>'])
        })
    })

    describe('solution', () => {
        it('should return 288957 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/10-syntax-scoring/example.txt'), 288957)
        })
        it('should return 4245130838 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/10-syntax-scoring/input.txt'), 4245130838)
        })
    })
})
