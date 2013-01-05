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
  var arr, urlObj = url.parse(u);

  // should start with http/https
  if (!urlObj.protocol) {
    var err = new Error(u + ' should start with http/https');
    callback(err);
    return;
  }

  // assets combo url
  if (/^\?\?/.test(urlObj.search)) {
    var prefix = u.split('??')[0];
    arr = urlObj.search.replace(/^\?\?/, '').split(',');
    async.reduce(arr, [], function(memo, item, callback) {
      checkUrl(prefix + item, function(err, data) {
        if (err) {
          callback(err);
        }
        callback(null, memo.concat(data));
      });
    }, function(err, result) {
      callback(err, result);
    });
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
    protocol[urlObj.protocol.replace(':', '')]
      // node 0.8.2 not support string
      // https://github.com/joyent/node/blob/v0.8.2/lib/https.js#L91
      .get(url.parse(u), function(res) {
        callback(null, [[u, res.statusCode]]);
      })
      .on('error', function(e) {
        callback(e);
      });
  }
};

