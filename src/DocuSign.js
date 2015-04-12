'use strict';

var schema = require('./schema');
var helper = require('./helper');
//var config   = require('./config');
//var endpoint = require('./endpoints');

function DocuSign(config) {
  if (schema.config.validate(config).length > 0) {
    throw new Error('DocuSign config is invalid. You must provide an email, password and an integrator key.');
  }

  this.config = config;
}

DocuSign.prototype.login = function () {
  return helper
    .get('https://demo.docusign.net/restapi/v2/login_information', '', this.config)
    .then(function(response){
      return response.loginAccounts[0];
    });
};

module.exports = DocuSign;
