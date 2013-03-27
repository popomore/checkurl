var url = require('url');
var async = require('async');
var protocol = {
  http: require('http'),
  https: require('https')
};

// Example:
//   checkurl(url, function(err, data){
//
//   }
//
// Data:
// [
//   [url, status],
//   ...
// ]
module.exports = function checkUrl(u, callback) {
  // support array
  // checkurl([url1, url2])
  if (u instanceof Array) {
    checkArray(u, callback);
    return;
  }

  var arr, urlObj = url.parse(u);

  // should start with http/https
  if (!urlObj.protocol) {
    var err = new Error(u + ' should start with http/https');
    callback(err);
    return;
  }

  // assets combo url
  if (/^\?\?/.test(urlObj.search)) {
    checkCombo(u, callback);
  // image combo url
  } else if (/\/combo(\.png|\.jpg|32\.png)\?/.test(u)) {
    var param = {};
    var a = urlObj.query.split('&');
    for (var i in a) {
      var j = a[i];
      var t = j.split('=');
      param[t[0]] = t[1];
    }
    arr = param.t ? param.t.split(',') : [];
    async.reduce(arr, [], function(memo, item, callback) {
      var uu = [
        urlObj.protocol,
        '//',
        urlObj.host,
        '/common/combo/',
        param.d,
        '/',
        item,
        '.png'
      ].join('');
      checkUrl(uu, function(err, data) {
        if (err) {
          callback(err);
        }
        callback(null, memo.concat(data));
      });
    }, function(err, result) {
      callback(err, result);
    });
  } else {
    checkSingleUrl(u, callback);
  }
};

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

function checkCombo (comboUrl, callback) {
  var s = comboUrl.split('??');
  var prefix = s[0];
  var arr = s[1]
    .split(',')
    .map(function(item){
      return prefix + item;
    });
  checkArray(arr, callback);
}

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

