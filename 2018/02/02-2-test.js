const assert = require('assert');
let findSimilarBoxIds = require('./02-2-solution');

describe('02-2-solution', () => {
    describe('findSimilarBoxIds', () => {
        it('should return fgij for given example', () => {
            let result = findSimilarBoxIds([
                'abcde', 'fghij', 'klmno', 'pqrst',
                'fguij', 'axcye', 'wvxyz'
            ]);
            assert.equal(result, 'fgij');
        });
    });
});
