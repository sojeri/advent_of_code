const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let solution = require('./05-1-solution');

describe('05-1-solution', () => {
    describe('solution', () => {
        it('should return 5 for example input', () => {
            assert.equal(solution([0, 3, 0, 1, -3]), 5);
        });

        it('should return 372139 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2017/05/input.txt');
            assert.equal(result, 372139);
        });
    });
});
