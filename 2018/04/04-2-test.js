const assert = require('assert');
// let runCallbackAgainstFile = require('../utils/runCbAgainstFileAsArray');
let solution = require('./04-2-solution');

describe('04-2-solution', () => {
    describe('solution', () => {
        it('should return true for example input', () => {
            assert.equal(solution(), true);
        });
    });
});
