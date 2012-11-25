#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var lineReader = require('line-reader');
var checkUrl = require('../lib/checkurl');

var color = {
  C_RED: '\033[31m',
  C_BLUE: '\033[34m',
  C_GREEN: '\033[32m',
  C_RESET: '\033[0m'
};

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

function exit() {
    console.error('Please input url or file');
    console.error('Example:');
    console.error('    /path/to/combocheck.js http://assets.test.alipay.net/ar/??arale.core.js,aralex.confirmbox-2.1.js');
    console.error('    /path/to/combocheck.js file.txt');
    process.exit(1);
}

function print(err, data) {
  if (err) {
    throw err;
  }
  data.forEach(function(o, i) {
    var status = (o[1] == 200 ? color.C_GREEN : color.C_RED) + o[1] + color.C_RESET;
    console.log('GET ' + o[0] + ' -> ' + status);
  });
}

