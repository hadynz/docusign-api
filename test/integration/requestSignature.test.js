'use strict';

var assert = require('chai').assert;
var config = require('./lib/config');
var DocuSign = require('../../src/DocuSign');

describe('requestSignature', function () {

  describe('via Template', function () {

    /**
     * On a given envelope if a recipient does not have the clientUserId element defined then the recipient
     * is a remote recipient, and requests to them will be initiated through email notifications. On the other
     * hand, if the clientUserId is present and it's value is not null then the recipient is an embedded recipient,
     * and they can access the envelope through a URL token instead of a hyperlink in an email.
     */
    var signer = {
      email: 'alwarnassy@gmail.com',
      name: 'Mohamed Hussein',
      roleName: 'Tenant',
      clientUserId: '1001',
      requireIdLookup: true,
      IDCheckConfigurationName: 'SMS Auth $',
      smsAuthentication: {
        senderProvidedNumbers: [
          '+6421677551'
        ]
      }
    };

    var envelopeRequest = {
      emailSubject: 'docusign-api Unit Test - via Template',
      templateId: '5beae4a6-93e4-4bf5-a3b7-80547fad6b7b',
      templateRoles: [
        signer,
        {
          email: 'abdodollar@gmail.com',
          name: 'Abdo Dollar',
          roleName: 'Landlord'
          //clientUserId: '2001'
        },
        {
          email: 'hadyos@gmail.com',
          name: 'Hady Osman',
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
          assert.isNotNull(envelopeId);
          assert.isString(envelopeId);

          return docuSign.getRecipientView(envelopeId, recipientRequest);
        })
        .then(function (response) {
          console.log(response.url);
          assert.match(response.url, /Signing\/startinsession.aspx\?t\=/);
          done();
        });
    });

  });

  describe('for Document', function () {

    var envelopeRequest = {
      emailSubject: 'docusign-api Unit Test - for Document',
      documents: [
        {
          name: './test/integration/assets/pdf-sample.pdf',
          documentId: 1
        },
        {
          name: './test/integration/assets/pdf-sample.pdf',
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
          assert.isNotNull(envelopeId);
          assert.isString(envelopeId);
          done();
        });
    });

  });

  describe('via Composite Template', function () {
    var envelopeRequest = {
      status: 'sent',
      emailSubject: 'docusign-api Unit Test - via Composite Template',
      emailBlurb: 'Test Envelope Blurb',
      compositeTemplates: [
        {
          inlineTemplates: [
            {
              sequence: 1,
              recipients: {
                signers: [
                  {
                    email: 'hadyos@gmail.com',
                    name: 'Hady Osman',
                    recipientId: '1',
                    tabs: {
                      signHereTabs: [
                        {
                          xPosition: '100',
                          yPosition: '100',
                          documentId: '1',
                          pageNumber: '1'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          document: {
            documentId: 1,
            name: './test/integration/assets/pdf-sample.pdf'
          }
        }
      ]
    };

    it('creates an envelope with documents that use a composite templates', function (done) {
      this.timeout(10000);

      var docuSign = new DocuSign(config);
      docuSign
        .requestSignature(envelopeRequest)
        .then(function (envelopeId) {
          assert.isNotNull(envelopeId);
          assert.isString(envelopeId);
          done();
        });
    });

  });

});
