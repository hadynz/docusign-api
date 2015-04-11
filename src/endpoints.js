'use strict';

var endpoint = {

  login: '/login_information',

  createEnvelopeFromTemplate: '/envelopes',

  getRecipientView: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/views/recipient';
  },

  getEnvelopeRecipientsIncludingTabs: function (envelopeId) {
    return this.createEnvelopeFromTemplate + '/' + envelopeId + '/recipients?include_tabs=true';
  }

}

module.exports = endpoint;
