const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let solution = require('./05-1-solution');

describe('05-1-solution', () => {
    describe('solution', () => {
        it('should return 0 for input aA', () => {
            assert.equal(solution('aA'), 0);
        });

        it('should return 0 for input abBA', () => {
            assert.equal(solution('abBA'), 0);
        });

        it('should return 4 for input abAB', () => {
            assert.equal(solution('abAB'), 4);
        });

        it('should return 6 for input aabAAB', () => {
            assert.equal(solution('aabAAB'), 6);
        });

        it('should return 10 for input dabAcCaCBAcCcaDA', () => {
            assert.equal(solution('dabAcCaCBAcCcaDA'), 10);
        });

        it('should return 10 for input dabAcCaCBAcCcaDA as a file', () => {
            let result = runCallbackAgainstFile(solution, '2018/05/05-1-example.txt');
            assert.equal(result, 10);
        });

        it('should return 9116 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2018/05/input.txt');
            assert.equal(result, 9116);
        });
    });
});
