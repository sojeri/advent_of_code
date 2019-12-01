const assert = require('assert')
let { parseFrequencyChanges, parseFrequencyChangesFromFile } = require('./01-1-solution')

function getFilePath(fileName) {
    return `2018/01/${fileName}`
}

describe('01-1-solution', () => {
    describe('examples from problem statement', () => {
        it('should return 3 for input +1 +1 +1', () => {
            assert.equal(parseFrequencyChanges('+1\n+1\n+1'), 3)
        })

        it('should return 0 for input +1 +1 -2', () => {
            assert.equal(parseFrequencyChanges('+1\n+1\n-2'), 0)
        })

        it('should return -6 for input -1 -2 -3', () => {
            assert.equal(parseFrequencyChanges('-1\n-2\n-3'), -6)
        })

        it('should return 3 for input +1 -2 +3 +1', () => {
            assert.equal(parseFrequencyChanges('+1\n-2\n+3\n+1'), 3)
        })
    })

    describe('examples from problem statement as files', () => {
        it('should return 3 for input +1 +1 +1', () => {
            assert.equal(parseFrequencyChangesFromFile(getFilePath('01-1-111.txt')), 3)
        })

        it('should return 0 for input +1 +1 -2', () => {
            assert.equal(parseFrequencyChangesFromFile(getFilePath('01-1-112.txt')), 0)
        })

        it('should return -6 for input -1 -2 -3', () => {
            assert.equal(parseFrequencyChangesFromFile(getFilePath('01-1-123.txt')), -6)
        })

        it('should return 3 for input +1 -2 +3 +1', () => {
            assert.equal(parseFrequencyChangesFromFile(getFilePath('01-1-1231.txt')), 3)
        })
    })
})
