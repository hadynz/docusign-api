'use strict';

module.exports = {
  config: {
    email: 'email@address.com',
    password: 'passw0rd',
    integratorKey: 'xxx-xxxxx-xxx-xxxxxx'
  },
  login: {
    loginAccounts: [
      {
        accountId: '12345',
        name: 'Account Name',
        email: 'email@address.com',
        userName: 'Username',
        userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxx',
        baseUrl: 'https://baseurl/restapi/v2/accounts/XYZ1234',
        isDefault: 'true',
        siteDescription: ''
      }
    ]
  },
  envelope: {
    envelopeId: 'xxxxx-xxx-xxxxx',
    status: '',
    statusDateTime: '',
    uri: ''
  }
};
