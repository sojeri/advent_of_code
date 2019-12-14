const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { calculateFuelForItemV2, calculateFuelWholeShipV2 } = require('./01-2-solution')

describe('01-2-solution', () => {
    describe('calculateFuelForItemV2()', () => {
        it('should return 2 for 14', () => {
            assert.equal(calculateFuelForItemV2(14), 2)
        })

        it('should return 966 for 1969', () => {
            assert.equal(calculateFuelForItemV2(1969), 966)
        })

        it('should return 50346 for 100756', () => {
            assert.equal(calculateFuelForItemV2(100756), 50346)
        })
    })

    describe('calculateFuelWholeShipV2()', () => {
        it('should return 968 for 14,1969', () => {
            assert.equal(calculateFuelWholeShipV2([14, 1969]), 968)
        })

        it('should return 51312 for 1969,100756', () => {
            assert.equal(calculateFuelWholeShipV2([1969, 100756]), 51312)
        })

        it('should return 4943969 for puzzle input', () => {
            let result = runCallbackAgainstFile(calculateFuelWholeShipV2, '2019/01-fuel-calculator/input.txt')
            assert.equal(result, 4943969)
        })
    })
})
