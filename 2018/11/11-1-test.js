const assert = require('assert');
let {getPowerForCoordinate, getLargestPower3x3Cell} = require('./11-1-solution');

describe('11-1-solution', () => {
    describe('getPowerForCoordinate', () => {
        it('should return 4 for example 3,5 8', () => {
            assert.equal(getPowerForCoordinate(3, 5, 8), 4);
        });

        it('should return -5 for example 122,79 57', () => {
            assert.equal(getPowerForCoordinate(122, 79, 57), -5);
        });

        it('should return 0 for example 217,196 39', () => {
            assert.equal(getPowerForCoordinate(217, 196, 39), 0);
        });

        it('should return 4 for example 101,153 71', () => {
            assert.equal(getPowerForCoordinate(101, 153, 71), 4);
        });
    });

    describe('getLargestPower3x3Cell', () => {
        it('should return 33,45 for grid #18', () => {
            assert.equal(getLargestPower3x3Cell(18), '33,45');
        });

        it('should return 21,61 for grid #42', () => {
            assert.equal(getLargestPower3x3Cell(42), '21,61');
        });

        it('should return 235,48 for grid #7403', () => {
            assert.equal(getLargestPower3x3Cell(7403), '235,48');
        });
    });
});
