const assert = require('assert');
const runCbAgainstFileAsArray = require('./runCbAgainstFileAsArray');

function total(arrayOfInts) {
    let sum = Number(arrayOfInts[0]);
    for (let i = 1; i < arrayOfInts.length; i++) {
        sum += Number(arrayOfInts[i]);
    }
    return sum;
}

function doNothing(array) {
    return array;
}

describe('utils', () => {
    describe('runCbAgainstFileAsArray', () => {
        it('should return the file contents as an array', () => {
            let result = runCbAgainstFileAsArray(doNothing, 'utils/noTrailingNewLine.txt');
            assert.equal(result.length, 3);
            assert.equal(result.pop(), '3');
        });
    
        it('should not include a trailing new line', () => {
            let result = runCbAgainstFileAsArray(doNothing, 'utils/trailingNewLine.txt');
            assert.equal(result.length, 3);
            assert.equal(result.pop(), '3');
        });
    
        it('should run the callback fn against the array', () => {
            assert.equal(runCbAgainstFileAsArray(total, 'utils/trailingNewLine.txt'), 6);
        });
    });
});