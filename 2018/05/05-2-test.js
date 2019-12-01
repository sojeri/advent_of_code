const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./05-2-solution')

describe('05-2-solution', () => {
    describe('solution', () => {
        it('should return 4 for input dabAcCaCBAcCcaDA', () => {
            assert.equal(solution('dabAcCaCBAcCcaDA'), 4)
        })

        it('should return 4 for input dabAcCaCBAcCcaDA as a file', () => {
            let result = runCallbackAgainstFile(solution, '2018/05/05-1-example.txt')
            assert.equal(result, 4)
        })

        it('should return 6890 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2018/05/input.txt')
            assert.equal(result, 6890)
        })
    })
})
