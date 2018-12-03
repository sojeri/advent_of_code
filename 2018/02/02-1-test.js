const assert = require('assert');
let runCallbackAgainstFile = require('../utils/runCbAgainstFileAsArray');
let {
    reduceBoxId,
    generateChecksum
} = require('./02-1-solution');

describe('02-1-solution', () => {
    describe('reduceBoxId', () => {
        it('should return two==false && three==false for input abcdef', () => {
            let reduced = reduceBoxId('abcdef');
            assert.equal(reduced.two, false);
            assert.equal(reduced.three, false);
        });
        
        it('should return two==true && three=true for input bababc', () => {
            let reduced = reduceBoxId('bababc');
            assert.equal(reduced.two, true);
            assert.equal(reduced.three, true);
        });
        
        it('should return two=true && three=false for input abbcde', () => {
            let reduced = reduceBoxId('abbcde');
            assert.equal(reduced.two, true);
            assert.equal(reduced.three, false);
        });

        it('should return two=false && three=true for input abcccd', () => {
            let reduced = reduceBoxId('abcccd');
            assert.equal(reduced.two, false);
            assert.equal(reduced.three, true);
        });

        it('should return two=true && three=false for input aabcdd', () => {
            let reduced = reduceBoxId('aabcdd');
            assert.equal(reduced.two, true);
            assert.equal(reduced.three, false);
        });

        it('should return two=true && three=false for input abcdee', () => {
            let reduced = reduceBoxId('abcdee');
            assert.equal(reduced.two, true);
            assert.equal(reduced.three, false);
        });

        it('should return two=false && three=true for input ababab', () => {
            let reduced = reduceBoxId('ababab');
            assert.equal(reduced.two, false);
            assert.equal(reduced.three, true);
        });
    });

    describe('generateChecksum', () => {
        it('should return 12 for input matching above', () => {
            assert.equal(generateChecksum([
                'abcdef', 'bababc', 'abbcde', 'abcccd',
                'aabcdd', 'abcdee', 'ababab'
            ]), 12);
        });
    });

    describe('generateChecksum against file', () => {
        it('should return 12 for input matching above', () => {
            let testFileChecksum = runCallbackAgainstFile(
                generateChecksum,
                '02/02-1-testFile.txt');
            assert.equal(testFileChecksum, 12);
        });
    });
});