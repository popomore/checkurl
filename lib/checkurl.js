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
  var urlObj = url.parse(u);

  // should start with http/https
  if (!urlObj.protocol) {
    var err = new Error(u + ' should start with http/https');
    callback(err);
    return;
  }

  // combo url
  if (/^\?\?/.test(urlObj.search)) {
    var prefix = u.split('??')[0];
    var arr = urlObj.search.replace(/^\?\?/, '').split(',');
    async.reduce(arr, [], function(memo, item, callback) {
      checkUrl(prefix + item, function(err, data) {
        if (err) {
          callback(err);
        }
        memo.push(data);
        callback(null, memo);
      });
    }, function(err, result) {
      callback(null, result);
    });
  } else {
    protocol[urlObj.protocol.replace(':', '')]
      .get(u, function(res) {
        callback(null, [u, res.statusCode]);
      })
      .on('error', function(e) {
        callback(e);
      });
  }
};

