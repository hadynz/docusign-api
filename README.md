# docusign-api [![Build Status](https://travis-ci.org/hadynz/docusign-api.svg)](https://travis-ci.org/hadynz/docusign-api)

Promise based DocuSign API for NodeJS.

## Installation

```bash
npm install docusign-api
```

## Usage

```js
var DocuSign = require('docusign-api'),
var config = {
  email: '#EMAIL',
  password: '#PASSWORD',
  key: '#INTEGRATOR KEY'
};

// Then we instantiate a client with DocuSign auth tokens

var docuSign = new DocuSign(config);
```

## DocuSign api

You must have a valid DocuSign auth token (password and integrator key) for the following:

#### Login to DocuSign (GET /login_information)

```js
var docuSign = new DocuSign(config);

docuSign
  .login()
  .then(function(response){
    console.log('API baseUrl', response.baseUrl);
    console.log('DocuSign accountId', response.accountId);
  });
```

#### Create an Envelope to request a signature  (POST /envelopes)

```js
var docuSign = new DocuSign(config);

var envelopeRequest = {
  emailSubject: 'API Call that uses a Template',
  templateId: 'xxxxx-xxx-xxxx-xxxx-xxxxxxxxxx',
  templateRoles: [{
    roleName: 'Role'
    name: 'Sally Doe',
    email: 'sally.doe@email.com'
  }],
  status: 'sent'
};

docuSign
  .requestSignature(envelopeRequest)
  .then(function(envelopeId){
    console.log('Envelope ID', envelopeId);
  });
```

#### Get Recipient View for embedded signing (POST /#{envelopeId}/views/recipient)

```js
var docuSign = new DocuSign(config);

var envelopeId = 'xxxx-xxx-xxxx';

var recipientRequest = {
  returnUrl: 'http://www.docusign.com/devcenter',
  authenticationMethod: 'email',
  userName: 'Sally Doe',
  email: 'sally.doe@email.com'
};

docuSign
  .getRecipientView(envelopeId, recipientRequest)
  .then(function(response){
    console.log('Embedded signing workflow Url', response.url);
  });
```

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

Integration tests will test the API end to end against a real DocuSign API endpoint. You will first 
need to rename [`config.dev.json.stub`][stub] to `config.dev.json` and update with your DocuSign auth settings.

To run integration tests:

```bash
grunt integration
```

## License

Copyright (c) 2015 Hady Osman   
Licensed under the [MIT][license] license.

[license]: https://github.com/hadynz/docusign-api/blob/master/README.md
[stub]: https://github.com/hadynz/docusign-api/blob/master/config.dev.json.stub
