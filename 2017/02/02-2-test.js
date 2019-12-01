const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { getTotal, getEvenlyDivisible } = require('./02-2-solution')

describe('02-2-solution', () => {
    describe('getEvenlyDivisible', () => {
        it('should return 4 for 5 9 2 8', () => {
            assert.equal(getEvenlyDivisible('5	9	2	8'), 4)
        })

        it('should return 3 for 9 4 7 3', () => {
            assert.equal(getEvenlyDivisible('9	4	7	3'), 3)
        })

        it('should return 2 for 3 8 6 5', () => {
            assert.equal(getEvenlyDivisible('3	8	6	5'), 2)
        })
    })

    describe('getTotal', () => {
        it('should return 9 for the example input', () => {
            let result = getTotal(['5	9	2	8', '9	4	7	3', '3	8	6	5'])
            assert.equal(result, 9)
        })

        it('should return 9 for the example input as a file', () => {
            let result = runCallbackAgainstFile(getTotal, '2017/02/02-2-example.txt')
            assert.equal(result, 9)
        })
    })
})
