'use strict';

var schema = require('./schema');
var Helper = require('./helper/Helper');
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

DocuSign.prototype.createEnvelopeFromTemplate = function (envelopeRequest) {
  var self = this;

  return self.helper
    .validateSchema(envelopeRequest)
    .then(function(){
      return self.login();
    })
    .then(function (response) {
      var url = response.baseUrl + endpoint.createEnvelopeFromTemplate;
      return self.helper.get(url, envelopeRequest, 'POST');
    })
    .then(function (response) {
      return response.envelopeId;
    });
};

DocuSign.prototype.getRecipientView = function (envelopeId, recipientRequest) {
  var self = this;

  return self.helper
    .validateSchema(recipientRequest)
    .then(function(){
      return self.login();
    })
    .then(function (response) {
      var url = response.baseUrl + endpoint.getRecipientView(envelopeId);
      return self.helper.get(url, recipientRequest, 'POST');
    });
};

module.exports = DocuSign;
