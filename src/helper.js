'use strict';

var request = require('request');
var Promise = require('promise');

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

module.exports = {

  get: function (url, body, config) {
    return new Promise(function (fulfill, reject) {
      // set request url, method, body, and headers
      var options = initializeRequest(url, 'GET', body, config);

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
  }

};
