#!env node

// example: ./combocheck.js http://assets.p46.alipay.net/\?\?gallery/moment/1.6.2/moment.js,arale/calendar/0.8.1/calendar.js,arale/overlay/0.9.12/overlay.js,arale/overlay/0.9.12/mask.js,arale/validator/0.8.9/validator.js,arale/validator/0.8.9/core.js,arale/select/0.9.0/select.js,arale/iframeshim/1.0.0/iframe-shim.js,consumeprod/record/1.0.0/i18n/zh-cn/lang.js,alipay/xbox/0.9.8/xbox.js,alipay/poptip/1.1.1/poptip.js

var URL = require('url'),
    path = require('path');

var inputstr = process.argv[2];
if (!inputstr) {
    console.error('Please input combo url like: /path/to/combocheck.js http://assets.test.alipay.net/ar/??arale.core.js,aralex.confirmbox-2.1.js');
    process.exit(1);
}

var obj = URL.parse(inputstr);
var protocol = obj.protocol ? obj.protocol.replace(/\:*$/, '') : 'http';
var http = require(protocol);

var host = obj.host;

var liststr = obj.query ? obj.query.replace(/^\?*/, '') : '';
var files = liststr.split(',');

var C_RED   = '\033[31m',
    C_BLUE  = '\033[34m',
    C_GREEN = '\033[32m',
    C_RESET = '\033[0m';

files.forEach(function(filename, i) {
    var fullpath = protocol + '://' + (host || '') + path.normalize(obj.pathname + '/' + filename);
    var req = http.get(fullpath, function(res) {
        console.log(protocol + ' GET ' + fullpath + ' -> ' + (res.statusCode == 200 ? C_GREEN : C_RED) + res.statusCode + C_RESET);
    }).on('error', function(e) {
        console.log(protocol + ' GET ' + fullpath + ' -> ' + C_RED + 'Error' + C_RESET);
    });
});
