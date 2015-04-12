'use strict';

var schema = require('validate');

var docuSignConfig = schema({
  email: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  integratorKey: {
    type: 'string',
    required: true
  }
});

module.exports = {
  config: docuSignConfig
};
