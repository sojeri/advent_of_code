const assert = require('assert')
const sumArray = require('../js/sumArray')

describe('sumArray module', () => {
    describe('sumArray.simpleSum()', () => {
        it('throws an error if input is not an array', () => {
            assert.throws(
                () => {
                    sumArray.simpleSum(null)
                },
                Error,
                'ArgumentError: numericValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.simpleSum({})
                },
                Error,
                'ArgumentError: numericValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.simpleSum('item1,item2,item3')
                },
                Error,
                'ArgumentError: numericValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.simpleSum(42)
                },
                Error,
                'ArgumentError: numericValues should be an array'
            )
        })

        it('returns the sum of all the items in the array', () => {
            assert.equal(sumArray.simpleSum([1, 2, 3]), 6)
            assert.equal(sumArray.simpleSum([1, 2, -4]), -1)
        })

        it("doesn't verify numeric values, which means it concatenates strings", () => {
            assert.equal(sumArray.simpleSum(['1', '2', '3']), '123')
        })
    })

    describe('sumArray.complexSum()', () => {
        it('throws an error if first parameter is not an array', () => {
            assert.throws(
                () => {
                    sumArray.complexSum(null)
                },
                Error,
                'ArgumentError: mysteriousValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum({})
                },
                Error,
                'ArgumentError: mysteriousValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum('item1,item2,item3')
                },
                Error,
                'ArgumentError: mysteriousValues should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum(42)
                },
                Error,
                'ArgumentError: mysteriousValues should be an array'
            )
        })

        it('throws an error if second parameter is not a function', () => {
            assert.throws(
                () => {
                    sumArray.complexSum([], null)
                },
                Error,
                'ArgumentError: quantifyMysteryCb should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum([], {})
                },
                Error,
                'ArgumentError: quantifyMysteryCb should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum([], 'function')
                },
                Error,
                'ArgumentError: quantifyMysteryCb should be an array'
            )

            assert.throws(
                () => {
                    sumArray.complexSum([], 42)
                },
                Error,
                'ArgumentError: quantifyMysteryCb should be an array'
            )
        })

        it('returns the sum of all the items in the array -- as defined by the given callback fn', () => {
            let returnOne = () => {
                return 1
            }
            assert.equal(sumArray.complexSum([1, 2, 3], returnOne), 3)
            assert.equal(sumArray.complexSum([1, 2, -4], returnOne), 3)
        })

        it("doesn't verify numeric values, which means it concatenates strings", () => {
            let returnItem = v => {
                return v
            }
            assert.equal(sumArray.complexSum(['1', '2', '3'], returnItem), '0123')
        })
    })
})
