const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution, calcDirSizes } = require('./07-1-solution')

describe('07-1-solution', () => {
    describe('solution', () => {
        it('should return 95_437 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/07-no-space-left/example.txt'), 95_437)
        })
        it('should return 1_644_735 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2022/07-no-space-left/input.txt'), 1_644_735)
        })
    })

    describe('calcDirSizes', () => {
        it('should return expected dict for example input', () => {
            assert.deepEqual(runCallbackAgainstFile(calcDirSizes, '2022/07-no-space-left/example.txt'), {
                '/': 48_381_165,
                '/>a': 94_853,
                '/>d': 24_933_642,
                '/>a>e': 584,
            })
        })
    })
})
