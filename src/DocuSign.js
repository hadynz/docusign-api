'use strict';

var request = require('request');
var schema = require('./schema');
var Promise = require('promise');
//var config   = require('./config');
//var endpoint = require('./endpoints');

function DocuSign(config) {
  if (schema.config.validate(config).length > 0) {
    throw new Error('DocuSign config is invalid. You must provide an email, password and an integrator key.');
  }

  this.config = config;
}

// --- HELPER FUNCTIONS ---
function addRequestHeaders(headers, config) {
  // JSON formatted authentication header (XML format allowed as well)
  var dsAuthHeader = JSON.stringify({
    'Username': config.email,
    'Password': config.password,
    'IntegratorKey': config.integratorKey
  });

  // DocuSign authorization header
  headers['X-DocuSign-Authentication'] = dsAuthHeader;
}

function initializeRequest(url, method, body, config) {
  var options = {
    'method': method,
    'uri': url,
    'body': body,
    'headers': {}
  };

  addRequestHeaders(options.headers, config);

  return options;
}

function parseResponseBody(error, response) {
  if (response.statusCode !== 200 && response.statusCode !== 201) { // success statuses
    return false;
  }
  return true;
}

DocuSign.prototype.login = function () {
  var self = this;

  return new Promise(function (fulfill, reject) {
    var url = 'https://demo.docusign.net/restapi/v2/login_information';
    var body = ''; // no request body for login api call

    // set request url, method, body, and headers
    var options = initializeRequest(url, 'GET', body, self.config);

    // send the request...
    request(options, function (error, response, body) {
      var parsedBody = JSON.parse(body);

      if (!parseResponseBody(error, response)) {
        reject(parsedBody);
        return;
      }

      fulfill(parsedBody);
    });

  });
};

module.exports = DocuSign;
