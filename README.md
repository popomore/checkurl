# checkurl

A tiny url status check tool

---


## 使用说明

```
checkurl 
```

combo 文件 404。

例如 http://assets.sit.alipay.net/static/ar/\?\?alipay.light.base-1.4.js,alipay.light.page-1.7-sizzle.js,alipay.security.base-1.2.js,alipay.security.edit-1.9.js,alipay.security.cert-1.1.js,alipay.security.otp-1.1.js,alipay.security.mobile-1.4.js,alipay.security.ctuMobile-1.0.js,alipay.security.riskMobileBank-1.0.js,alipay.security.riskMobileAccount-1.0.js,alipay.security.riskMobileCredit-1.0.js,alipay.security.riskCertificate-1.0.js,alipay.security.riskSecurityQa-1.0.js,alipay.security.riskExpressPrivacy-1.0.js,alipay.security.core-1.6.js,aralex.ConfirmBox-3.4.js

这个 url 可能很长，若其中一个文件没有发布都会 404。


## 自动化工具

## Install

```
npm install checkurl -g
```

## 使用

    combocheck http://assets.sit.alipay.net/static/ar/\?\?alipay.light.base-1.4.js,alipay.light.page-1.7-sizzle.js,alipay.security.base-1.2.js,alipay.security.edit-1.9.js,alipay.security.cert-1.1.js,alipay.security.otp-1.1.js,alipay.security.mobile-1.4.js,alipay.security.ctuMobile-1.0.js,alipay.security.riskMobileBank-1.0.js,alipay.security.riskMobileAccount-1.0.js,alipay.security.riskMobileCredit-1.0.js,alipay.security.riskCertificate-1.0.js,alipay.security.riskSecurityQa-1.0.js,alipay.security.riskExpressPrivacy-1.0.js,alipay.security.core-1.6.js,aralex.ConfirmBox-3.4.js

执行结果一目了然，这样很利于快速定位问题。

![](https://raw.github.com/shaoshuai0102/combocheck/master/assets/example.png)
