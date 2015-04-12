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
    'body': JSON.stringify(body),
    'headers': {}
  };

  addRequestHeaders(options.headers, config);

  return options;
}

function Helper(config) {
  this.config = config;
}

Helper.prototype.get = function(url, body, method) {
  var self = this;

  return new Promise(function (fulfill, reject) {
    var requestParams = initializeRequest(url, method, body, self.config);

    request(requestParams, function (error, response, body) {
      var parsedBody = JSON.parse(body);

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        reject(parsedBody);
        return;
      }

      fulfill(parsedBody);
    });
  });
};

module.exports = Helper;
