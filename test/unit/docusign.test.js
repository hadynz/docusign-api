'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var DocuSign = require('../../src/DocuSign');
var mockResponse = require('./lib/mock.responses');

describe('DocuSign', function () {
  var actualRequests;
  var stub;

  var mockRequest = function (request, callback) {
    actualRequests.push(request);
    callback.call(this, null, {statusCode: 200}, JSON.stringify(stub()));
  };

  beforeEach(function () {
    stub = sinon.stub();
  });

  afterEach(function () {
    actualRequests = [];
    stub = null;
  });

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
      stub.returns(mockResponse.login);

      var docuSign = new DocuSign(mockResponse.config, mockRequest);
      docuSign
        .login()
        .then(function () {
          var actualRequest = actualRequests[0];
          var authHeaders = JSON.parse(actualRequest.headers['X-DocuSign-Authentication']);

          assert.strictEqual(actualRequest.method, 'GET');
          assert.strictEqual(actualRequest.uri, 'https://demo.docusign.net/restapi/v2/login_information');
          assert.property(actualRequest.headers, 'X-DocuSign-Authentication');
          assert.property(authHeaders, 'Username');
          assert.property(authHeaders, 'Password');
          assert.property(authHeaders, 'IntegratorKey');

          done();
        });
    });

  });

  describe('requestSignature', function () {

    it('some test', function (done) {
      stub.onFirstCall().returns(mockResponse.login);
      stub.onSecondCall().returns(mockResponse.envelope);

      var docuSign = new DocuSign(mockResponse.config, mockRequest);
      docuSign
        .requestSignature({})
        .then(function () {
          assert.lengthOf(actualRequests, 2);
          assert.strictEqual(actualRequests[1].method, 'POST');

          done();
        })
        .catch(function (error) {
          console.log('error', error);
        });
    });

  });

});
