const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('solution', () => {
        it('should return 19 for example input', () => {
            assert.strictEqual(solution('mjqjpqmgbljsphdztnvjfqwrcgsmlb'), 19)
        })
        it('should return 23 for example input', () => {
            assert.strictEqual(solution('bvwbjplbgvbhsrlpgdmjqwftvncz'), 23)
        })
        it('should return 23 for example input', () => {
            assert.strictEqual(solution('nppdvjthqldpwncqszvftbrmjlhg'), 23)
        })
        it('should return 29 for example input', () => {
            assert.strictEqual(solution('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'), 29)
        })
        it('should return 26 for example input', () => {
            assert.strictEqual(solution('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'), 26)
        })
        it('should return 26 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/06-tuning-trouble/example.txt', true), 26)
        })
        it('should return 3_495 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/06-tuning-trouble/input.txt', true), 3_495)
        })
    })
})
