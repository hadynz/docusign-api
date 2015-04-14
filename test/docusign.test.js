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

  describe('requestSignature', function () {

    describe('via Template', function() {

      var envelopeRequest = {
        emailSubject: 'docusign-api Unit Test - via Template',
        templateId: '5beae4a6-93e4-4bf5-a3b7-80547fad6b7b',
        templateRoles: [
          {
            email: 'user@test.com',
            name: 'Test User',
            roleName: 'Tenant',
            clientUserId: '1001' // user-configurable
          }
        ],
        status: 'sent'
      };

      it('returns an envelopeId string for a given templateId in the DocuSign sandbox', function (done) {
        this.timeout(5000);

        var docuSign = new DocuSign(config);

        docuSign
          .requestSignature(envelopeRequest)
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

    describe('for Document', function () {

      var envelopeRequest = {
        emailSubject: 'docusign-api Unit Test - for Document',
        documents: [
          {
            name: './test/assets/pdf-sample.pdf',
            documentId: 1
          },
          {
            name: './test/assets/pdf-sample.pdf',
            documentId: 2
          }
        ],
        recipients: {
          signers: [
            {
              email: 'abdodollar@gmail.com',
              name: 'Abdo Dollar',
              recipientId: 1,
              tabs: {
                signHereTabs: [
                  {
                    xPosition: '100',
                    yPosition: '100',
                    documentId: '1',
                    pageNumber: '1'
                  },
                  {
                    xPosition: '100',
                    yPosition: '600',
                    documentId: '2',
                    pageNumber: '1'
                  }
                ]
              }
            }
          ]
        },
        status: 'sent'
      };

      it('returns an envelopeId for envelope created for uploaded document', function (done) {
        this.timeout(5000);

        var docuSign = new DocuSign(config);

        docuSign
          .requestSignature(envelopeRequest)
          .then(function (envelopeId) {
            console.log('envelopeId', envelopeId);
            assert.isNotNull(envelopeId);
            assert.isString(envelopeId);
            done();
          })
          .catch(function (error) {
            console.log('error', error);
            assert.fail('This test should never fail', error);
          });
      });

    });

  });

  describe('getRecipientView', function () {

    /**
     * On a given envelope if a recipient does not have the clientUserId element defined then the recipient
     * is a remote recipient, and requests to them will be initiated through email notifications. On the other
     * hand, if the clientUserId is present and it's value is not null then the recipient is an embedded recipient,
     * and they can access the envelope through a URL token instead of a hyperlink in an email.
     */
    var signer = {
      email: 'hadyos@gmail.com',
      name: 'Hady Osman',
      roleName: 'Tenant',
      clientUserId: '1001'
    };

    var envelopeRequest = {
      emailSubject: 'docusign-api Unit Test',
      templateId: '5beae4a6-93e4-4bf5-a3b7-80547fad6b7b',
      templateRoles: [
        signer,
        {
          email: 'dina.gharbo@gmail.com',
          name: 'Dina Gharbo',
          roleName: 'Landlord',
          //clientUserId: '2001'
        },
        {
          email: 'abdodollar@gmail.com',
          name: 'Abdo Dollar',
          roleName: 'Real Estate Agent'
        }
      ],
      status: 'sent',
      notification: {
        useAccountDefaults: true
      }
    };

    var recipientRequest = {
      returnUrl: 'http://www.docusign.com/devcenter',
      authenticationMethod: 'email',
      email: signer.email,
      userName: signer.name,
      clientUserId: signer.clientUserId
    };

    it('returns an envelopeId string for a given templateId in the DocuSign sandbox', function (done) {
      this.timeout(10000);

      var docuSign = new DocuSign(config);

      docuSign
        .requestSignature(envelopeRequest)
        .then(function (envelopeId) {
          return docuSign.getRecipientView(envelopeId, recipientRequest);
        })
        .then(function (response) {
          console.log((response.url));
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
