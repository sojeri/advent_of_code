const assert = require('assert')
const fs = require('fs')
const sinon = require('sinon')
const runCbAgainstFileAsArray = require('../js/runCbAgainstFileAsArray')

const total = arrayOfStringInts => {
    let sum = 0
    arrayOfStringInts.forEach(si => {
        sum += Number(si)
    })
    return sum
}

const returnArrayUnchanged = array => {
    return array
}

describe('runCbAgainstFileAsArray()', () => {
    const noTrailingNewLineFile = 'foo/bar/noTrailingNewLine.txt'
    const trailingNewLineFile = 'foo/baz/trailingNewLine.txt'
    const noTrailingNewLine = Buffer.from('1\n2\n3')
    const trailingNewLine = Buffer.from('1\n2\n3\n')

    it('should return the file contents as an array', () => {
        sinon
            .stub(fs, 'readFileSync')
            .withArgs(noTrailingNewLineFile)
            .returns(noTrailingNewLine)

        let result = runCbAgainstFileAsArray(returnArrayUnchanged, noTrailingNewLineFile)
        assert.equal(result.length, 3)
        assert.equal(result.pop(), '3')

        fs.readFileSync.restore()
    })

    it('should not include a trailing new line', () => {
        sinon
            .stub(fs, 'readFileSync')
            .withArgs(trailingNewLineFile)
            .returns(trailingNewLine)

        let result = runCbAgainstFileAsArray(returnArrayUnchanged, trailingNewLineFile)
        assert.equal(result.length, 3)
        assert.equal(result.pop(), '3')

        fs.readFileSync.restore()
    })

    it('should run the callback fn against the array', () => {
        sinon
            .stub(fs, 'readFileSync')
            .withArgs(trailingNewLineFile)
            .returns(trailingNewLine)

        assert.equal(runCbAgainstFileAsArray(total, trailingNewLineFile), 6)

        fs.readFileSync.restore()
    })
})
