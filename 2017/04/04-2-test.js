const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let { areNoWordsAnagrams, countValidPassphrasesV2 } = require('./04-2-solution');

describe('04-2-solution', () => {
    describe('areNoWordsAnagrams', () => {
        it('should return true for input containing no words that are anagrams of each other', () => {
            assert.equal(areNoWordsAnagrams('abcde fghij'), true);
            assert.equal(areNoWordsAnagrams('a ab abc abd abf abj'), true);
            assert.equal(areNoWordsAnagrams('iiii oiii ooii oooi oooo'), true);
        });

        it('should return false for input containing any words that are anagrams of each other', () => {
            assert.equal(areNoWordsAnagrams('abcde xyz ecdab'), false);
            assert.equal(areNoWordsAnagrams('oiii ioii iioi iiio'), false);
        });
    });

    describe('countValidPassphrasesV2', () => {
        it('should return 3 for example input', () => {
            let twoValidPassphrases = ['abcde fghij', 'iiii oiii ooii oooi oooo', 'oiii ioii iioi iiio'];
            assert.equal(countValidPassphrasesV2(twoValidPassphrases), 2);
        });

        it('should return 119 for puzzle input', () => {
            let result = runCallbackAgainstFile(countValidPassphrasesV2, '2017/04/input.txt');
            assert.equal(result, 119);
        });
    })
});
