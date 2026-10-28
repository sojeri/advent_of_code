const assert = require('assert')
const runCallbackAgainstFile = require('../../../utils/js/runCbAgainstFileAsArray')
const { solution, getChecksum } = require('./02-1-solution')

describe('02-1-solution', () => {
    describe('getChecksum', () => {
        it('should return 35_124 for `4<3 2<5 3>1 1>2 1<5 4<1 3>2 4<2 3>5 4<5`', () => {
            assert.strictEqual(getChecksum('4<3 2<5 3>1 1>2 1<5 4<1 3>2 4<2 3>5 4<5'), 35_124)
        })
        it('should return 43_521 for `4>1 2>1 3>2 1<5 4>5 2<5 3>1 4>3 2<4 5<3`', () => {
            assert.strictEqual(getChecksum('4>1 2>1 3>2 1<5 4>5 2<5 3>1 4>3 2<4 5<3'), 43_521)
        })
        it('should return 43_512 for `5>1 5>2 4>1 2<4 3>2 3<4 1>2 3>5 1<3 4>5`', () => {
            assert.strictEqual(getChecksum('5>1 5>2 4>1 2<4 3>2 3<4 1>2 3>5 1<3 4>5'), 43_512)
        })
    })
    describe('solution', () => {
        it('should return 122_157 for example input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/02-the-axeperiment/example.txt', true),
                122_157
            )
        })
        it('should return 414_996 for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, 'everybody_codes/2026/02-the-axeperiment/input.txt', true),
                414_996
            )
        })
    })
})
