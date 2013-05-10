# checkurl

[![Build Status](https://travis-ci.org/popomore/checkurl.png?branch=master)](https://travis-ci.org/popomore/checkurl)

A tiny url status check tool

---


## Usage

### Check url

```
$ checkurl http://www.baidu.com
HEAD http://www.baidu.com/ -> 200
```

### Check combo

```
$ checkurl http://static.alipayobjects.com/static/ar/??alipay.light.base-1.4.js,alipay.security.riskMobileAccount-1.0.js
HEAD http://static.alipayobjects.com/static/ar/alipay.light.base-1.4.js -> 200
HEAD http://static.alipayobjects.com/static/ar/alipay.security.riskMobileAccount-1.0.js -> 404
```

### Check image combo

```
$ checkurl 'https://i.alipayobjects.com/combo.jpg?d=apps/24&t=10015,10016'
HEAD https://i.alipayobjects.com/common/combo/apps/24/10015.png -> 200
HEAD https://i.alipayobjects.com/common/combo/apps/24/10016.png -> 200
```

### Check file

urls.txt

```
http://static.alipayobjects.com/static/ar/alipay.light.base-1.4.js
http://static.alipayobjects.com/static/ar/alipay.security.riskMobileAccount-1.0.js
```

Check url in urls.txt

```
$ checkurl urls.txt
HEAD http://static.alipayobjects.com/static/ar/alipay.light.base-1.4.js -> 200
HEAD http://static.alipayobjects.com/static/ar/alipay.security.riskMobileAccount-1.0.js -> 404
```

### Require module

You can require `checkurl`

```
var checkurl = require('checkurl');
checkurl('url', function(data) {
  // use data
});
```

Data structure

```
[
  ['url', 200],
  ['url', 404]
]
```

if check single url, data structure is

```
['url', 200]
```

### events

1. checked

    this events will emit after every url is checked.


    ```
    checkurl('url', function(data) {
      // use data
    }).on('checked', function(data){
        
    });
    ```

2. error

    this events will emit when any url get error.

    ```
    checkurl('url', function(data) {
      // use data
    }).on('error', function(err){
        
    });
    ```

## Install

```
npm install checkurl -g
```

## License

BSD

### Thanks

https://github.com/shaoshuai0102/combocheck
