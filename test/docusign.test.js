'use strict';

var assert = require('chai').assert;
var config = require('./lib/config');
var DocuSign = require('../src/DocuSign');

describe('DocuSign', function () {

  describe('ctor', function () {

    it('should be an object', function () {
      var config = {email: '#email', password: '#password', integratorKey: '#key'};
      var docuSign = new DocuSign(config);

      assert.isObject(docuSign);
    });

    it('throws an exception when a config is not passed', function () {
      assert.throw(function () {
        new DocuSign();
      }, Error);
    });

    it('throws an exception if mandatory properties are not passed in config', function () {
      var config = {};

      assert.throw(function () {
        new DocuSign(config);
      }, Error);
    });

  });

  describe('load', function () {

    it('returns an expected response object', function (done) {
      var docuSign = new DocuSign(config);

      docuSign
        .login()
        .then(function (response) {
          assert.equal(response.baseUrl, 'https://demo.docusign.net/restapi/v2/accounts/992167');
          assert.equal(response.accountId, '992167');
          done();
        });
    });

  });

});
