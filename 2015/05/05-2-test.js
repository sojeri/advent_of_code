const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { countTruths } = require('../../utils/js/countTruths')
let solution = require('./05-2-solution')

describe('05-2-solution', () => {
    describe('solution', () => {
        it('should return true (is nice) for aaaa', () => {
            assert.equal(solution('aaaa'), true)
        })

        it('should return true (is nice) for qjhvhtzxzqqjkmpb', () => {
            assert.equal(solution('qjhvhtzxzqqjkmpb'), true)
        })

        it('should return true (is nice) for xxyxx', () => {
            assert.equal(solution('xxyxx'), true)
        })

        it('should return false (is naughty / not nice) for aaa', () => {
            assert.equal(solution('aaa'), false)
        })

        it('should return false (is naughty / not nice) for uurcxstgmygtbstg', () => {
            assert.equal(solution('uurcxstgmygtbstg'), false)
        })

        it('should return false (is naughty / not nice) for ieodomkazucvgmuy', () => {
            assert.equal(solution('ieodomkazucvgmuy'), false)
        })
    })

    describe('countTruths(collection, solution)', () => {
        it('should return 2 for all of the above', () => {
            let data = ['aaaa', 'qjhvhtzxzqqjkmpb', 'aaa', 'uurcxstgmygtbstg', 'ieodomkazucvgmuy']
            assert.equal(countTruths(data, solution), 2)
        })

        it('should return 53 for the puzzle input', () => {
            let countTruthsAgainstSolution = (input) => {
                return countTruths(input, solution)
            }
            let result = runCallbackAgainstFile(
                countTruthsAgainstSolution,
                '2015/05/input.txt');
            assert.equal(result, 53);
        })
    })
})
