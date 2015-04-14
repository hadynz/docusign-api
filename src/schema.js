'use strict';

var schema = require('validate');

var docuSignConfigSchema = schema({
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

var envelopeRequestSchema = schema({
  templateId: {
    type: 'string',
    required: true
  },
  status: {
    type: 'string',
    required: true
  },
  templateRoles: {
    type: 'array'
  }
});

module.exports = {
  config: docuSignConfigSchema,
  envelopeRequest: envelopeRequestSchema
};


/*
'emailSubject': 'docusign-api Unit Test',
  'templateId': templateId,
  'templateRoles': [
  {
    'email': email,
    'name': recipientName,
    'roleName': templateRoleName,
    'clientUserId': '1001' // user-configurable
  }
],
  'status': 'sent'

  */
