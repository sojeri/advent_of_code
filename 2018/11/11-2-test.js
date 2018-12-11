const assert = require('assert');
let {getLargestPowerCell} = require('./11-2-solution');

describe.only('11-2-solution', () => {
    describe('getLargestPowerCell', () => {
        it('should return 90,269,16 for grid #18', () => {
            assert.equal(getLargestPowerCell(18), '90,269,16');
        });

        it('should return 232,251,12 for grid #42', () => {
            assert.equal(getLargestPowerCell(42), '232,251,12');
        });
        
        it('should return ??? for grid #7403', () => {
            assert.equal(getLargestPowerCell(7403), '???');
        });
    });
});
