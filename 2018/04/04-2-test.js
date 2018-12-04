const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let solution = require('./04-2-solution');

describe('04-2-solution', () => {
    describe('solution', () => {
        it('should return 4455 for example input file', () => {
            let result = runCallbackAgainstFile(solution, '2018/04/04-example.txt');
            assert.equal(result, 4455);
        });
        it('should return 58559 for puzzle input file', () => {
            let result = runCallbackAgainstFile(solution, '2018/04/input.txt');
            assert.equal(result, 58559);
        });
    });
});
    