var libpath = process.env['ICOV'] ? './lib-cov' : './lib';

module.exports = require(libpath + '/checkurl');
