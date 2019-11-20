const assert = require('assert');
const fs = require('fs');
const sinon = require('sinon');
const scaffoldCurrentDirectory = require('../js/scaffoldCurrentDirectory');

describe('scaffoldCurrentDirectory()', () => {
    it('should throw an error if given directory has already been scaffolded', () => {
        sinon.stub(fs, 'existsSync').returns(true);
        assert.throws(() => {scaffoldCurrentDirectory('foo/bar/baz')});
        fs.existsSync.restore();
    });
});