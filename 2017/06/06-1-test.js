const assert = require('assert');
let {countRedistributionCycles} = require('./06-1-solution');

describe('06-1-solution', () => {
    describe('countRedistributionCycles', () => {
        it('should return 5 for example input', () => {
            assert.equal(countRedistributionCycles('0	2	7	0'), 5);
        });

        it('should return 11137 for puzzle input', () => {
            let puzzleInput = '14	0	15	12	11	11	3	5	1	6	8	4	9	1	8	4';
            assert.equal(countRedistributionCycles(puzzleInput), 11137);
        });
    });
});
