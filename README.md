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

## Install

```
npm install checkurl -g
```

## License

BSD

### Thanks

https://github.com/shaoshuai0102/combocheck
