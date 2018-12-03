const assert = require('assert');
let {
    findFirstRecurringFrequency,
    findFirstRecurringFrequencyFromFile
} = require('./01-2-solution');

describe('01-2-solution', () => {
    describe('examples from problem statement', () => {
        it('should return 0 for input +1 -1', () => {
            assert.equal(findFirstRecurringFrequency('+1\n-1'), 0);
        });
        
        it('should return 10 for input +3 +3 +4 -2 -4', () => {
            assert.equal(findFirstRecurringFrequency('+3\n+3\n+4\n-2\n-4'), 10);
        });
        
        it('should return 5 for input -6 +3 +8 +5 -6', () => {
            assert.equal(findFirstRecurringFrequency('-6\n+3\n+8\n+5\n-6'), 5);
        });

        it('should return 14 for input +7 +7 -2 -7 -4', () => {
            assert.equal(findFirstRecurringFrequency('+7\n+7\n-2\n-7\n-4'), 14);
        });
        
        it('should return 2 for input +1 -2 +3 +1 +1 -2', () => {
            assert.equal(findFirstRecurringFrequency('+1\n-2\n+3\n+1\n+1\n-2'), 2);
        });
    });

    describe('examples from problem statement as files', () => {
        it('should return 0 for input +1 -1', () => {
            assert.equal(findFirstRecurringFrequencyFromFile('01/01-2-11.txt'), 0);
        });
        
        it('should return 10 for input +3 +3 +4 -2 -4', () => {
            assert.equal(findFirstRecurringFrequencyFromFile('01/01-2-33424.txt'), 10);
        });
        
        it('should return 5 for input -6 +3 +8 +5 -6', () => {
            assert.equal(findFirstRecurringFrequencyFromFile('01/01-2-63856.txt'), 5);
        });

        it('should return 14 for input +7 +7 -2 -7 -4', () => {
            assert.equal(findFirstRecurringFrequencyFromFile('01/01-2-77274.txt'), 14);
        });
        
        it('should return 2 for input +1 -2 +3 +1 +1 -2', () => {
            assert.equal(findFirstRecurringFrequencyFromFile('01/01-2-123112.txt'), 2);
        });
    });
});