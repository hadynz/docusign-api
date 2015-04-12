'use strict';

var schema = require('./schema');
var Helper = require('./Helper');
//var config   = require('./config');
var endpoint = require('./endpoints');

function DocuSign(config) {
  schema.config.assert(config);

  this.helper = new Helper(config);
}

DocuSign.prototype.login = function () {
  return this.helper
    .get('https://demo.docusign.net/restapi/v2/login_information', '', 'GET')
    .then(function (response) {
      return response.loginAccounts[0];
    });
};

DocuSign.prototype.createEnvelopeFromTemplate = function (templateId, email, recipientName, templateRoleName) {
  var self = this;
  var body = {
    'emailSubject': 'docusign-api Unit Test',
    'templateId': templateId,
    'templateRoles': [
      {
        'email': email,
        'name': recipientName,
        'roleName': templateRoleName,
        'clientUserId': '1001' // user-configurable
      }
    ],
    'status': 'sent'
  };

  return this
    .login()
    .then(function (response) {
      var url = response.baseUrl + endpoint.createEnvelopeFromTemplate;
      return self.helper.get(url, body, 'POST');
    })
    .then(function (response) {
      return response.envelopeId;
    });
};

DocuSign.prototype.getRecipientView = function (envelopeId) {
  var self = this;
  var body = {
    'returnUrl': 'http://www.docusign.com/devcenter',
    'authenticationMethod': 'email',
    'email': 'abdodollar@gmail.com',
    'userName': 'Test User',
    'clientUserId': '1001'// must match clientUserId in step 2!
  };

  return this
    .login()
    .then(function (response) {
      var url = response.baseUrl + endpoint.getRecipientView(envelopeId);
      return self.helper.get(url, body, 'POST');
    });
};

module.exports = DocuSign;
