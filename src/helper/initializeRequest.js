'use strict';

var addRequestHeaders = require('./addRequestHeaders');
var addMultipartHeaders = require('./addMultipartHeaders');

function initializeRequest(url, method, body, authConfig) {
  var options = {
    'method': method,
    'uri': url,
    'body': JSON.stringify(body),
    'headers': {}
  };

  addRequestHeaders(options.headers, authConfig);

  addMultipartHeaders(options, body);

  return options;
}

module.exports = initializeRequest;
