require('should');
var helper = require('../').helper;

describe('Helper', function() {

  it('isEmptyObject', function() {
    helper.isEmptyObject({}).should.be.ok;
    helper.isEmptyObject({a:1}).should.not.be.ok;
  });

});