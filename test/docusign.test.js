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

    it('returns the correct base URL and accountId for given test account in DocuSign sandbox', function (done) {
      var expectedBaseUrl = 'https://demo.docusign.net/restapi/v2/accounts/992167';
      var expectedAccountId = '992167';
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

  describe('createEnvelopeFromTemplate', function () {

    it('returns an envelopeId string for a given templateId in the DocuSign sandbox', function (done) {
      this.timeout(5000);

      var templateId = '5beae4a6-93e4-4bf5-a3b7-80547fad6b7b';
      var docuSign = new DocuSign(config);

      docuSign
        .createEnvelopeFromTemplate(templateId, 'user@test.com', 'Test User', 'Tenant')
        .then(function (envelopeId) {
          assert.isNotNull(envelopeId);
          assert.isString(envelopeId);
          done();
        })
        .catch(function (error) {
          assert.fail('This test should never fail', error);
        });
    });

  });

  describe('getRecipientView', function () {

    it('returns an envelopeId string for a given templateId in the DocuSign sandbox', function (done) {
      this.timeout(10000);

      var templateId = '5beae4a6-93e4-4bf5-a3b7-80547fad6b7b';
      var docuSign = new DocuSign(config);

      docuSign
        .createEnvelopeFromTemplate(templateId, 'abdodollar@gmail.com', 'Test User', 'Tenant')
        .then(function(envelopeId){
          return docuSign.getRecipientView(envelopeId);
        })
        .then(function (response) {
          assert.isNotNull(response.url);
          assert.isString(response.url);
          assert.match(response.url, /Signing\/startinsession.aspx\?t\=/);
          done();
        })
        .catch(function (error) {
          console.log('error', error);
          assert.fail('This test should never fail', error);
        });
    });

  });

});
