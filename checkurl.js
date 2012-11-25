var url = require('url');
var fs = require('fs');
var async = require('async');
var path = require('path');
var lineReader = require('line-reader');
var protocol = {
  http: require('http'),
  https: require('https')
};

var color = {
  C_RED: '\033[31m',
  C_BLUE: '\033[34m',
  C_GREEN: '\033[32m',
  C_RESET: '\033[0m'
};

module.exports = checkUrl;

var inputstr = process.argv[2];

if (!inputstr) exit();

if (fs.existsSync(inputstr)) {
  checkFile(file, print);
} else {
  checkUrl(inputstr, print);
}

function checkFile(file, callback) {
  lineReader.eachLine(file, function(url, last) {
    checkUrl(url, callback);
  });
}

function checkUrl(u, callback) {
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
}

function exit() {
    console.error('Please input url or file');
    console.error('Example:');
    console.error('    /path/to/combocheck.js http://assets.test.alipay.net/ar/??arale.core.js,aralex.confirmbox-2.1.js');
    console.error('    /path/to/combocheck.js file.txt');
    process.exit(1);
}

function print(err, data) {
  if (err) {
    exit();
  }
  data.forEach(function(o, i) {
    var status = (o[1] == 200 ? color.C_GREEN : color.C_RED) + o[1] + color.C_RESET;
    console.log('GET ' + o[0] + ' -> ' + status);
  });
}
