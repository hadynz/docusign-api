'use strict';

var addRequestHeaders = require('./addRequestHeaders');

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

module.exports = initializeRequest;
