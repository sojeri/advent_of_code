const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { countTruths } = require('../../utils/js/countTruths')
let solution = require('./05-1-solution')

describe('05-1-solution', () => {
    describe('solution', () => {
        it('should return true (is nice) for ugknbfddgicrmopn', () => {
            assert.equal(solution('ugknbfddgicrmopn'), true)
        })

        it('should return true (is nice) for aaa', () => {
            assert.equal(solution('aaa'), true)
        })

        it('should return false (is naughty / not nice) for jchzalrnumimnmhp', () => {
            assert.equal(solution('jchzalrnumimnmhp'), false)
        })

        it('should return false (is naughty / not nice) for haegwjzuvuyypxyu', () => {
            assert.equal(solution('haegwjzuvuyypxyu'), false)
        })

        it('should return false (is naughty / not nice) for dvszwmarrgswjxmb', () => {
            assert.equal(solution('dvszwmarrgswjxmb'), false)
        })
    })

    describe('countTruths(collection, solution)', () => {
        it('should return 2 for all of the above', () => {
            let data = ['ugknbfddgicrmopn', 'aaa', 'jchzalrnumimnmhp', 'haegwjzuvuyypxyu', 'dvszwmarrgswjxmb']
            assert.equal(countTruths(data, solution), 2)
        })

        it('should return 2 for all of the above as a file', () => {
            let countTruthsAgainstSolution = (input) => {
                return countTruths(input, solution)
            }
            let result = runCallbackAgainstFile(
                countTruthsAgainstSolution,
                '2015/05/example.txt');
            assert.equal(result, 2);
        })

        it('should return 258 for the puzzle input', () => {
            let countTruthsAgainstSolution = (input) => {
                return countTruths(input, solution)
            }
            let result = runCallbackAgainstFile(
                countTruthsAgainstSolution,
                '2015/05/input.txt');
            assert.equal(result, 258);
        })
    })
})
