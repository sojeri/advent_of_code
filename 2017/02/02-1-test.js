const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let {
    getRowDiff,
    getTotalDiff
} = require('./02-1-solution');

describe('02-1-solution', () => {
    describe('getRowDiff', () => {
        it('should return 8 for input 5 1 9 5', () => {
            assert.equal(getRowDiff('5	1	9	5'), 8);
        });
        it('should return 8 for input 7 5 3', () => {
            assert.equal(getRowDiff('7	5	3'), 4);
        });
        it('should return 8 for input 2 4 6 8', () => {
            assert.equal(getRowDiff('2	4	6	8'), 6);
        });
    });

    describe('getTotalDiff', () => {
        it('should return 18 for example input', () => {
            // '2017/02/02-1-example.txt'
            assert.equal(getTotalDiff(
                ['5	1	9	5', '7	5	3', '2	4	6	8']),
                18);
        });

        it('should return 18 for example input as file', () => {
            let result = runCallbackAgainstFile(
                getTotalDiff,
                '2017/02/02-1-example.txt');
            assert.equal(result, 18);
        });
    });
});
