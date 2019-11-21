const assert = require('assert')
const {
    ArgumentErrorNotArray,
    ArgumentErrorNotFunction,
    countTruths
} = require('../js/countTruths')

describe('countTruths()', () => {
    it('throws an error if first parameter is not an array', () => {
        assert.throws(() => {
            countTruths(null, null)
        }, Error, ArgumentErrorNotArray)

        assert.throws(() => {
            countTruths({}, null)
        }, Error, ArgumentErrorNotArray)

        assert.throws(() => {
            countTruths('item1,item2,item3', null)
        }, Error, ArgumentErrorNotArray)

        assert.throws(() => {
            countTruths(42, null)
        }, Error, ArgumentErrorNotArray)
    })

    it('throws an error if second parameter is not a function', () => {
        assert.throws(() => {
            countTruths([], null)
        }, Error, ArgumentErrorNotFunction)

        assert.throws(() => {
            countTruths([], {})
        }, Error, ArgumentErrorNotFunction)

        assert.throws(() => {
            countTruths([], 'function')
        }, Error, ArgumentErrorNotFunction)

        let fn = () => { return true }
        assert.throws(() => {
            countTruths([], fn())
        }, Error, ArgumentErrorNotFunction)
    })

    it('returns the number of truths', () => {
        let arrayWithThreeNumberOnes = [0, 1, '1', 2, 1, 3, 1, 4]
        let isValueOneCb = (a) => { return a === 1 }
        
        assert.equal(
            countTruths(arrayWithThreeNumberOnes, isValueOneCb),
            3)

        let everythingIsTrueCb = () => { return true }
        assert.equal(
            countTruths(arrayWithThreeNumberOnes, everythingIsTrueCb),
            arrayWithThreeNumberOnes.length)
        
        let firstResult = true
        let halfIsTrueCb = () => {
            firstResult = !firstResult
            return firstResult
        }
        assert.equal(
            countTruths(arrayWithThreeNumberOnes, halfIsTrueCb),
            arrayWithThreeNumberOnes.length / 2)
    })
})