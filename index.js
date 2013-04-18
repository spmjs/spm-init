var libpath = process.env['ICOV'] ? './lib-cov' : './lib';

exports.helper = require(libpath + '/helper');
exports.manage = require(libpath + '/manage');
