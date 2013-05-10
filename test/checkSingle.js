var expect = require('expect.js');
var checkurl = require('..');

describe('checkSingle', function() {
  it('should check https', function(done) {
    var url = 'https://a.alipayobjects.com/seajs/1.2.1/sea.js';
    checkurl(url, function(result) {
      expect(result).to.eql([url, 200]);
      done();
    });
  });

  it('should check http', function(done) {
    var url = 'http://static.alipayobjects.com/seajs/1.2.1/sea.js';
    checkurl(url, function(result) {
      expect(result).to.eql([url, 200]);
      done();
    });
  });

  it('should not exist', function(done) {
    var url = 'http://static.alipayobjects.com/sea.js';
    checkurl(url, function(result) {
      expect(result).to.eql([url, 404]);
      done();
    });
  });
});