const assert = require('assert');
let solution = require('./03-1-solution');

describe('03-1-solution', () => {
    describe('solution', () => {
        it('should return 4 for example input', () => {
            let example = [
                '#1 @ 1,3: 4x4',
                '#2 @ 3,1: 4x4',
                '#3 @ 5,5: 2x2'
            ];
            assert.equal(solution(example), 4);
        });
    });
});
