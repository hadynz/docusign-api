'use strict';

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

module.exports = addRequestHeaders;
