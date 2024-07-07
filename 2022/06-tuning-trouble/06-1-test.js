const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-1-solution')

describe('06-1-solution', () => {
    describe('solution', () => {
        it('should return 7 for example input', () => {
            assert.strictEqual(solution('mjqjpqmgbljsphdztnvjfqwrcgsmlb'), 7)
        })
        it('should return 5 for example input', () => {
            assert.strictEqual(solution('bvwbjplbgvbhsrlpgdmjqwftvncz'), 5)
        })
        it('should return 6 for example input', () => {
            assert.strictEqual(solution('nppdvjthqldpwncqszvftbrmjlhg'), 6)
        })
        it('should return 10 for example input', () => {
            assert.strictEqual(solution('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'), 10)
        })
        it('should return 11 for example input', () => {
            assert.strictEqual(solution('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'), 11)
        })
        it('should return 11 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/06-tuning-trouble/example.txt', true), 11)
        })
        it('should return 1_140 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/06-tuning-trouble/input.txt', true), 1_140)
        })
    })
})
