# docusign-api [![Build Status](https://travis-ci.org/hadynz/docusign-api.svg)](https://travis-ci.org/hadynz/docusign-api)

DocuSign API for NodeJS.

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

#### Login to DocuSign (GET /login)

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

#### Get Reciept View (POST /xxxx-xxx-xxxx/views/recipient)

## DocuSign Terminology

The following is a definition of DocuSign's [common terms][terms] that is also being referred to in the code.

`Envelope`

This represents a container used to send documents to recipients. The envelope carries information about the sender 
and timestamps to indicate the progress of the delivery procedure. It can contain collections of Documents, Tabs 
and Recipients and is analogous to a physical envelope.

`Document`

A document that is to be delivered, representing the content to be reviewed and/or signed by one or more recipients. 
Documents have names and are always encrypted while stored in the system.

`Tab` or `Stick-eTab`

This represents a DocuSign Tab (also known as a Tag or Stick-eTab® ) on a document. It is used in several ways: 
First, it is used to indicate to a recipient where a signature or initials are required. Second, tabs can be used 
to show data or information to recipients, for instance, a company name automatically populates when the signing 
session is initiated, or a read-only calculated price field. Third, tabs may be used as editable information fields 
where signers can add data to a document.

`Recipient`

Someone who receives the envelope and, depending on the settings, can sign (or initial) the documents or can add 
information where indicated by tabs. There are currently 7 different recipient types in the DocuSign platform, see 
the Features section for more information.

`Template`

A pre-set envelope with specific documents, set recipient roles, recipient routing order, recipient authentication, 
signing tabs and information fields. Templates can also contain set signing instructions for the document and 
signature attachment requests. Templates can be set to allow the sender to make some changes before sending the 
envelope.

`Integrator Key`

An Integrator Key is a unique identifier for each DocuSign integration. It is used (and required) for all API 
calls to any DocuSign service. An Integrator Key is required for all integrations, and if you want to move to 
Production (make calls to www.docusign.net) you also must get Certified with DocuSign. See the Quick Start 
section for creating your Integrator Key and the Go Live section for information on Certification.

## License

Copyright (c) 2015 Hady Osman   
Licensed under the [MIT][license] license.

[terms]: https://www.docusign.com/developer-center/explore/overview
[license]: https://github.com/hadynz/docusign-api/blob/master/README.md
