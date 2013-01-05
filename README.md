# checkurl

A tiny url status check tool

---


## Usage

### Check url

```
$ checkurl http://www.baidu.com
GET http://www.baidu.com/ -> 200
```

### Check combo

```
$ checkurl http://static.alipayobjects.com/static/ar/??alipay.light.base-1.4.js,alipay.security.riskMobileAccount-1.0.js
GET http://static.alipayobjects.com/static/ar/alipay.light.base-1.4.js -> 200
GET http://static.alipayobjects.com/static/ar/alipay.security.riskMobileAccount-1.0.js -> 404
```

### Check image combo

```
$ checkurl 'https://i.alipayobjects.com/combo.jpg?d=apps/24&t=10015,10016'
GET https://i.alipayobjects.com/common/combo/apps/24/10015.png -> 200
GET https://i.alipayobjects.com/common/combo/apps/24/10016.png -> 200
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
GET http://static.alipayobjects.com/static/ar/alipay.light.base-1.4.js -> 200
GET http://static.alipayobjects.com/static/ar/alipay.security.riskMobileAccount-1.0.js -> 404
```

### Require module

You can require `checkurl`

```
var checkurl = require('checkurl');
checkurl('url', function(err, data) {
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

## Install

```
npm install checkurl -g
```

## License

BSD

### Thanks

https://github.com/shaoshuai0102/combocheck
