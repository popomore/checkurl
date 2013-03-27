var url = require('url');
var async = require('async');
var protocol = {
  http: require('http'),
  https: require('https')
};

var TEST_ASSETS_COMBO = /^https?:\/\/[^\/]*\/\?\?/g;
var TEST_IMAGE_COMBO = /\/combo(\.png|\.jpg|32\.png)\?/g;
var TEST_SINGLE_URL = /^http/;

module.exports = function checkUrl(input, callback) {
  //console.log(input)
  //console.log(TEST_SINGLE_URL.test(input))
  if (input instanceof Array) {
    checkArray(input, callback);

  } else if (TEST_ASSETS_COMBO.test(input)) {
    checkAssetsCombo(input, callback);

  } else if (TEST_IMAGE_COMBO.test(input)) {
    checkImageCombo(input, callback);

  } else if (TEST_SINGLE_URL.test(input)) {
    checkSingleUrl(input, callback);

  } else {
    callback(null, []);
  }
};

// check image combo in Alipay
// checkurl('https://i.alipayobjects.com/combo.png?d=cashier&t=CDCB,ICBC,IMCC')
// return [[url1, 200], [url2, 404]]
function checkImageCombo (comboUrl, callback) {
  var parsed = url.parse(comboUrl);
  var query = parseQuery(parsed.query);
  var tpl = [
    parsed.protocol,
    '//',
    parsed.host,
    '/common/combo/',
    query.d,
    '/',
    '{{name}}',
    '.png'
  ].join('');

  if (query.t) {
    var arr = query.t
      .split(',').map(function(item) {
        return tpl.replace(/{{name}}/g, item);
      });
    checkArray(arr, callback);
  } else {
    callback(null, []);
  }
}

// check assets combo in Alipay
// checkurl('https://a.alipayobjects.com/??seajs/1.3.1/sea.js,seajs/1.3.1/combo.js')
// return [[url1, 200], [url2, 404]]
function checkAssetsCombo (comboUrl, callback) {
  var s = comboUrl.split('??');
  var prefix = s[0];
  var arr = s[1]
    .split(',')
    .map(function(item){
      return prefix + item;
    });
  checkArray(arr, callback);
}

// check assets of url
// checkurl([url1, url2])
// return [[url1, 200], [url2, 404]]
function checkArray (arrayUrl, callback) {
  async.map(arrayUrl, function(singleUrl, callback) {
    if(!singleUrl) return;
    checkSingleUrl(singleUrl, function(err, data) {
      if (err) {
        callback(err);
      }
      callback(null, data);
    });
  }, function(err, results){
    callback(err, results);
  });
}

// check a single url
// checkurl('https://a.alipayobjects.com/seajs/1.2.1/sea.js')
// return [url, 200]
function checkSingleUrl (singleUrl, callback) {
  var parsed = url.parse(singleUrl);
  parsed.agent = false;
  var request = protocol[parsed.protocol.replace(':', '')];

  // node 0.8.2 not support string
  // https://github.com/joyent/node/blob/v0.8.2/lib/https.js#L91
  request.get(parsed, function(res) {
    callback(null, [singleUrl, res.statusCode]);
  }).on('error', function(e) {
    callback(e);
  });
}

// a=1&b=2 => {a:1, b:2}
function parseQuery(search) {
  var param = {}, a = search.split('&');
  for(var i in a) {
    var v = a[i];
    var s = v.split('=');
    param[s[0]] = s[1];
  }
  return param;
}