var expect = require('expect.js');
var checkurl = require('..');

describe('checkNothing', function() {
  it('should not check', function(done) {
    checkurl('url', function(result) {
      expect(result).to.eql([]);
      done();
    });
  });
});