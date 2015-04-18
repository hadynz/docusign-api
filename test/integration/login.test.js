'use strict';

var assert = require('chai').assert;
var config = require('./lib/config');
var DocuSign = require('../../src/DocuSign');

describe('load', function () {

  it('establishes a DocuSign session and returns base URL and account ID\'s to use with all requests', function (done) {
    var expectedBaseUrl = 'https://demo.docusign.net/restapi/v2/accounts/' + config.accountId;
    var expectedAccountId = config.accountId;

    var docuSign = new DocuSign(config);
    docuSign
      .login()
      .then(function (response) {
        assert.equal(response.baseUrl, expectedBaseUrl);
        assert.equal(response.accountId, expectedAccountId);
        done();
      });
  });

});
