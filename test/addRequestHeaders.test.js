'use strict';

var assert = require('chai').assert;
var addRequestHeaders = require('../src/helper/addRequestHeaders');

describe('addRequestHeaders', function () {

  it('creates a "X-DocuSign-Authentication" header from auth config', function(){
    var config = {
      email: 'email@email.com',
      password: 'passw0rd',
      integratorKey: 'KEY123'
    };

    var expectedHeaders = {
      'X-DocuSign-Authentication': JSON.stringify({
        'Username': config.email,
        'Password': config.password,
        'IntegratorKey': config.integratorKey
      })
    };

    assert.deepEqual(addRequestHeaders(config).headers, expectedHeaders);
  });

});
