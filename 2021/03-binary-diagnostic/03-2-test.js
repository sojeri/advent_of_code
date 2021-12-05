const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { solution, findCO2ScrubberRate, findOxygenGeneratorRate } = require('./03-2-solution')

describe.only('03-2-solution', () => {
    describe('findOxygenGeneratorRate', () => {
        it('should return 10111 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(findOxygenGeneratorRate, '2021/03-binary-diagnostic/example.txt'),
                '10111'
            )
        })
    })
    describe('findCO2ScrubberRate', () => {
        it('should return 01010 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(findCO2ScrubberRate, '2021/03-binary-diagnostic/example.txt'),
                '01010'
            )
        })
    })
    describe('solution', () => {
        it('should return 230 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/example.txt'), 230)
        })
        it('should return 4474944 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/03-binary-diagnostic/input.txt'), 4474944)
        })
    })
})
