'use strict';

var assert = require('chai').assert;
//var supertest = require('supertest');
//var api = supertest('http://localhost:5000');

var DocuSign = require('../src/DocuSign');

describe('DocuSign', function () {

  describe('#construct()', function () {

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

});
