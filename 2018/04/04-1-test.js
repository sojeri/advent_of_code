const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let { generateChecksumForTheSleepiestGuard } = require('./04-1-solution');

describe('04-1-solution', () => {
    describe('generateChecksumForTheSleepiestGuard', () => {
        it('should return 240 for example input file', () => {
            let result = runCallbackAgainstFile(
                generateChecksumForTheSleepiestGuard,
                '2018/04/04-example.txt');
            assert.equal(result, 240);
        });

        it('should return 85296 for puzzle input file', () => {
            let result = runCallbackAgainstFile(
                generateChecksumForTheSleepiestGuard,
                '2018/04/input.txt');
            assert.equal(result, 85296);
        });
    });
});
