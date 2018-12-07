const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let solution = require('./05-2-solution');

describe('05-2-solution', () => {
    describe('solution', () => {
        it('should return 10 for example input', () => {
            assert.equal(solution([0, 3, 0, 1, -3]), 10);
        });

        it('should return 29629538 for puzzle input', () => {
            let result = runCallbackAgainstFile(solution, '2017/05/input.txt');
            assert.equal(result, 29629538);
        });
    });
});
