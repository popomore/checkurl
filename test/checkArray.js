var expect = require('expect.js');
var checkurl = require('../lib/checkurl');

describe('checkArray', function() {
  it('should check array', function(done) {
    var url = [
      'https://a.alipayobjects.com/seajs/1.3.1/sea.js',
      'https://a.alipayobjects.com/seajs/1.3.1/combo.js',
      'https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js'
    ];
    checkurl(url, function(err, result) {
      expect(result).to.eql([
        ['https://a.alipayobjects.com/seajs/1.3.1/sea.js', 200],
        ['https://a.alipayobjects.com/seajs/1.3.1/combo.js', 404],
        ['https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js', 200]
      ]);
      done();
    });
  });
});