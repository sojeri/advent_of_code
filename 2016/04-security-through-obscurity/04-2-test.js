const assert = require('assert')
const runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
const { decodeRoom, solution } = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('decodeRoom', () => {
        it('should return `very encrypted name 343` for `qzmt-zixmtkozy-ivhz-343`', () => {
            assert.strictEqual(decodeRoom('qzmt-zixmtkozy-ivhz-343'), 'very encrypted name 343')
        })
    })
    describe('solution', () => {
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(solution(), -1)
        // })
        // it('should return -1 for example input', () => {
        //     assert.strictEqual(runCallbackAgainstFile(solution, '2016/04-security-through-obscurity/example.txt'), -1)
        // })
        it('should return `northpole object storage 324` for puzzle input', () => {
            assert.strictEqual(
                runCallbackAgainstFile(solution, '2016/04-security-through-obscurity/input.txt'),
                `northpole object storage 324`
            )
        })
    })
})
