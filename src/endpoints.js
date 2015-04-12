'use strict';

var endpoint = {

  login: '/login_information',

  createEnvelopeFromTemplate: '/envelopes',

  getRecipientView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/recipient';
  }
};

module.exports = endpoint;
