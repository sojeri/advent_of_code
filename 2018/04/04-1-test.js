const assert = require('assert');
// let runCallbackAgainstFile = require('../utils/runCbAgainstFileAsArray');
let solution = require('./04-1-solution');

describe('04-1-solution', () => {
    describe('solution', () => {
        it('should return true for example input', () => {
            assert.equal(solution(), true);
        });
    });
});
