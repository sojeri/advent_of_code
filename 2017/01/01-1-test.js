const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let sumRepeatingDigits = require('./01-1-solution');

function getFilePath(string) {
    return `2017/01/01-1-${string}.txt`;
}

describe('01-1-solution', () => {
    describe('sumRepeatingDigits', () => {
        it('should return 3 for input 1122', () => {
            assert.equal(sumRepeatingDigits('1122'), 3);
        });

        it('should return 4 for input 1111', () => {
            assert.equal(sumRepeatingDigits('1111'), 4);
        });

        it('should return 0 for input 1234', () => {
            assert.equal(sumRepeatingDigits('1234'), 0);
        });

        it('should return 9 for input 91212129', () => {
            assert.equal(sumRepeatingDigits('91212129'), 9);
        });
    });

    describe('sumRepeatingDigits-- from file', () => {
        it('should return 3 for input 1122', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('1122'));
            assert.equal(result, 3);
        });

        it('should return 4 for input 1111', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('1111'));
            assert.equal(result, 4);
        });

        it('should return 0 for input 1234', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('1234'));
            assert.equal(result, 0);
        });

        it('should return 9 for input 91212129', () => {
            let result = runCallbackAgainstFile(sumRepeatingDigits, getFilePath('91212129'));
            assert.equal(result, 9);
        });
    });
});
