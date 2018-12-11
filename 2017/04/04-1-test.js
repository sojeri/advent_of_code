const assert = require('assert');
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray');
let { areWordsUnique, countValidPassphrases } = require('./04-1-solution');

describe('04-1-solution', () => {
    describe('areWordsUnique', () => {
        it('should return true for input with no repeating words', () => {
            assert.equal(areWordsUnique('aa bb cc dd ee'), true);
            assert.equal(areWordsUnique('aa bb cc dd aaa'), true);
        });

        it('should return false for input with some repeating words', () => {
            assert.equal(areWordsUnique('aa bb cc dd aa'), false);
        });
    });

    describe('countValidPassphrases', () => {
        let twoValidPassphrases = ['aa bb cc dd ee', 'aa bb cc dd aaa', 'aa bb cc dd aa'];

        it('should return 2 for example input', () => {
            assert.equal(countValidPassphrases(twoValidPassphrases), 2);
        });

        it('can take an optional isValid callback to override the default behavior', () => {
            let everythingIsValid = () => { return true; }
            let result = countValidPassphrases(twoValidPassphrases, everythingIsValid);
            assert.equal(result, 3);
        });

        it('should return 325 for puzzle input', () => {
            let result = runCallbackAgainstFile(countValidPassphrases, '2017/04/input.txt');
            assert.equal(result, 325);
        });

    });
});
