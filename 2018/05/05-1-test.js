const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let { calculateCompoundSizeAfterReaction } = require('./05-1-solution');

describe.only('05-1-solution', () => {
    describe('solution', () => {
        it('should return 0 for input aA', () => {
            assert.equal(calculateCompoundSizeAfterReaction('aA'), 0);
        });

        it('should return 0 for input abBA', () => {
            assert.equal(calculateCompoundSizeAfterReaction('abBA'), 0);
        });

        it('should return 4 for input abAB', () => {
            assert.equal(calculateCompoundSizeAfterReaction('abAB'), 4);
        });

        it('should return 6 for input aabAAB', () => {
            assert.equal(calculateCompoundSizeAfterReaction('aabAAB'), 6);
        });

        it('should return 10 for input dabAcCaCBAcCcaDA', () => {
            assert.equal(calculateCompoundSizeAfterReaction('dabAcCaCBAcCcaDA'), 10);
        });

        it('should return 10 for input dabAcCaCBAcCcaDA as a file', () => {
            let result = runCallbackAgainstFile(
                calculateCompoundSizeAfterReaction,
                '2018/05/05-1-example.txt');
            assert.equal(result, 10);
        });

        it('should return 9116 for puzzle input', () => {
            let result = runCallbackAgainstFile(
                calculateCompoundSizeAfterReaction,
                '2018/05/input.txt');
            assert.equal(result, 9116);
        });
    });
});
