const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let {calculateRibbonNeeded, calculateTotalRibbonForList} = require('./02-2-solution');

describe('02-2-solution', () => {
    describe('calculateRibbonNeeded', () => {
        it('should return 34 for 2x3x4', () => {
            assert.equal(calculateRibbonNeeded('2x3x4'), 34);
        });

        it('should return 14 for 1x1x10', () => {
            assert.equal(calculateRibbonNeeded('1x1x10'), 14);
        });
    });

    describe('calculateTotalRibbonForList', () => {
        it('should return 48 for 2x3x4,1x1x10', () => {
            assert.equal(calculateTotalRibbonForList(['2x3x4', '1x1x10']), 48);
        });

        it('should return 48 for 2x3x4,1x1x10 as a file', () => {
            let result = runCallbackAgainstFile(
                calculateTotalRibbonForList,
                '2015/02/example.txt');
            assert.equal(result, 48);
        });

        it('should return 3783758 for puzzle input', () => {
            let result = runCallbackAgainstFile(
                calculateTotalRibbonForList,
                '2015/02/input.txt');
            assert.equal(result, 3783758);
        });
    });
});
