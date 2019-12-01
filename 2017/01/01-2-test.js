const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let sumRepeatingDigits = require('./01-2-solution')

function getFilePath(string) {
    return `2017/01/01-2-${string}.txt`
}

describe('01-2-solution', () => {
    describe('sumRepeatingDigits', () => {
        it('should return 6 for input 1212', () => {
            assert.equal(sumRepeatingDigits('1212'), 6)
        })

        it('should return 0 for input 1221', () => {
            assert.equal(sumRepeatingDigits('1221'), 0)
        })

        it('should return 4 for input 123425', () => {
            assert.equal(sumRepeatingDigits('123425'), 4)
        })

        it('should return 12 for input 123123', () => {
            assert.equal(sumRepeatingDigits('123123'), 12)
        })

        it('should return 4 for input 12131415', () => {
            assert.equal(sumRepeatingDigits('12131415'), 4)
        })
    })

    describe('sumRepeatingDigits-- from file', () => {
        it('should return 6 for input 1212', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('1212'))
            assert.equal(result, 6)
        })

        it('should return 0 for input 1221', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('1221'))
            assert.equal(result, 0)
        })

        it('should return 4 for input 123425', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('123425'))
            assert.equal(result, 4)
        })

        it('should return 12 for input 123123', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('123123'))
            assert.equal(result, 12)
        })

        it('should return 4 for input 12131415', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('12131415'))
            assert.equal(result, 4)
        })
    })
})
