'use strict';

var request = require('request');
var schema = require('./schema');
//var config   = require('./config');
//var endpoint = require('./endpoints');

function DocuSign(config) {
  if (schema.config.validate(config).length > 0) {
    throw new Error('DocuSign config is invalid. Please check documentation.');
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

function parseResponseBody(error, response, body) {
  console.log('\r\nAPI Call Result: \r\n', JSON.parse(body));

  if (response.statusCode !== 200 && response.statusCode !== 201) { // success statuses
    console.log('Error calling webservice, status is: ', response.statusCode);
    console.log('\r\n', error);
    return false;
  }

  return true;
}

DocuSign.prototype.Login = function () {
  return new Promise(function (fulfill, reject) {
    var url = 'https://demo.docusign.net/restapi/v2/login_information';
    var body = ''; // no request body for login api call

    // set request url, method, body, and headers
    var options = initializeRequest(url, 'GET', body, this.config);

    // send the request...
    request(options, function (error, response, body) {
      if (!parseResponseBody(error, response, body)) {
        reject(error);
        return;
      }

      fulfill(JSON.parse(body));
    });

  });
};

module.exports = DocuSign;
