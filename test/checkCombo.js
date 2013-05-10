var expect = require('expect.js');
var checkurl = require('..');

describe('checkCombo', function() {
  it('should check assets combo', function(done) {
    var url = 'https://a.alipayobjects.com/??seajs/1.3.1/sea.js,seajs/1.3.1/combo.js,jquery/jquery/1.7.2/jquery.js';
    checkurl(url, function(result) {
      expect(result).to.eql([
        ['https://a.alipayobjects.com/seajs/1.3.1/sea.js', 200],
        ['https://a.alipayobjects.com/seajs/1.3.1/combo.js', 404],
        ['https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js', 200]
      ]);
      done();
    });
  });

  it('should check assets combo 2', function(done) {
    var url = 'https://a.alipayobjects.com/alice/??box/1.0.0/box.css,button/1.0.0/button.css,tab/1.0.0/tab.css';
    checkurl(url, function(result) {
      expect(result).to.eql([
        ['https://a.alipayobjects.com/alice/box/1.0.0/box.css', 200],
        ['https://a.alipayobjects.com/alice/button/1.0.0/button.css', 200],
        ['https://a.alipayobjects.com/alice/tab/1.0.0/tab.css', 200]
      ]);
      done();
    });
  });

  it('should check image combo', function(done) {
    var url = 'https://i.alipayobjects.com/combo.png?d=cashier&t=CDCB,ICBC,IMCC';
    checkurl(url, function(result) {
      expect(result).to.eql([
        ['https://i.alipayobjects.com/common/combo/cashier/CDCB.png', 200],
        ['https://i.alipayobjects.com/common/combo/cashier/ICBC.png', 200],
        ['https://i.alipayobjects.com/common/combo/cashier/IMCC.png', 404]
      ]);
      done();
    });
  });
});