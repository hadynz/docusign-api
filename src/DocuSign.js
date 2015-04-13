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

/**
 * Request a DocuSign signature via a pre-defined Template.
 *
 * @see {@link https://www.docusign.com/p/RESTAPIGuide/Content/REST%20API%20References/Send%20an%20Envelope%20from%20a%20Template.htm}
 * @param {Object} envelopeRequest
 * @returns {Promise}
 */
DocuSign.prototype.requestSignatureViaTemplate = function (envelopeRequest) {
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
