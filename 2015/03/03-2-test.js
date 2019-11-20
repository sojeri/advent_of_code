const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let solution = require('./03-2-solution');

describe('03-2-solution', () => {
    describe('solution', () => {
        it('should return 3 for ^v', () => {
            assert.equal(solution('^v'), 3);
        });

        it('should return 3 for ^>v<', () => {
            assert.equal(solution('^>v<'), 3);
        });

        it('should return 11 for ^v^v^v^v^v', () => {
            assert.equal(solution('^v^v^v^v^v'), 11);
        });

        it('should return 3 for ^>v< as a file', () => {
            let result = runCallbackAgainstFile(
                solution,
                '2015/03/example.txt');
            assert.equal(result, 3);
        });

        it('should return 2639 for puzzle input', () => {
            let result = runCallbackAgainstFile(
                solution,
                '2015/03/input.txt');
            assert.equal(result, 2639);
        });
    });
});
