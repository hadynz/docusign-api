'use strict';

var assert = require('chai').assert;
var proxyquire = require('proxyquire');

var fsStub = {
  readFileSync: function () {
    return '';
  }
};

var addMultipartHeaders = proxyquire('../src/helper/addMultipartHeaders', {'fs': fsStub});

describe('addMultipartHeaders', function () {

  it('adds no multipart headers for a request body with no documents', function () {
    var body = {};
    var expectedRequest = {};

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

  it('returns multipart headers for one document', function () {
    var body = {
      documents: [{
        documentId: 1,
        name: './test/assets/pdf-sample.pdf'
      }]
    };
    var expectedRequest = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      multipart: [
        {
          'Content-Type': 'application/json',
          'Content-Disposition': 'form-data',
          body: JSON.stringify(body)
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample.pdf"; documentId=1',
          body: fsStub.readFileSync()
        }
      ]
    };

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

  it('returns multipart headers for more than one document', function () {
    var body = {
      documents: [
        {documentId: 1, name: './test/assets/pdf-sample1.pdf'},
        {documentId: 2, name: './test/assets/pdf-sample2.pdf'},
        {documentId: 3, name: './test/assets/pdf-sample3.pdf'}
      ]
    };
    var expectedRequest = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      multipart: [
        {
          'Content-Type': 'application/json',
          'Content-Disposition': 'form-data',
          body: JSON.stringify(body)
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample1.pdf"; documentId=1',
          body: fsStub.readFileSync()
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample2.pdf"; documentId=2',
          body: fsStub.readFileSync()
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample3.pdf"; documentId=3',
          body: fsStub.readFileSync()
        }
      ]
    };

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

  it('returns multipart headers for one document inside a composite envelope', function () {
    var body = {
      compositeTemplates: [{
        inlineTemplates: [
          {
            sequence: 1,
            recipients: {
              signers: [{
                email: 'abbysemail@outlook.com',
                name: 'Abby Abbott',
                recipientId: '1'
              }]
            }
          }
        ],
        document: {
          documentId: 1,
          name: './test/assets/pdf-sample.pdf'
        }
      }]
    };

    var expectedRequest = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      multipart: [
        {
          'Content-Type': 'application/json',
          'Content-Disposition': 'form-data',
          body: JSON.stringify(body)
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample.pdf"; documentId=1',
          body: fsStub.readFileSync()
        }
      ]
    };

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

  it('returns multipart headers for documents inside multiple composite templates', function () {
    var body = {
      compositeTemplates: [
        {
          inlineTemplates: [
            {
              sequence: 1,
              recipients: {
                signers: [{
                  email: 'abbysemail@outlook.com',
                  name: 'Abby Abbott',
                  recipientId: '1'
                }]
              }
            }
          ],
          document: {
            documentId: 1,
            name: './test/assets/pdf-sample.pdf'
          }
        },
        {
          inlineTemplates: [
            {
              sequence: 2,
              recipients: {
                signers: [{
                  email: 'abbysemail@outlook.com',
                  name: 'Abby Abbott',
                  recipientId: '1'
                }]
              }
            }
          ],
          document: {
            documentId: 2,
            name: './test/assets/pdf-sample2.pdf'
          }
        }
      ]
    };

    var expectedRequest = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      multipart: [
        {
          'Content-Type': 'application/json',
          'Content-Disposition': 'form-data',
          body: JSON.stringify(body)
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample.pdf"; documentId=1',
          body: fsStub.readFileSync()
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample2.pdf"; documentId=2',
          body: fsStub.readFileSync()
        }
      ]
    };

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

  it('returns multipart headers for documents inside multiple composite templates with compositeTemplateId', function () {
    var body = {
      compositeTemplates: [
        {
          compositeTemplateId: 1,
          inlineTemplates: [
            {
              sequence: 1,
              recipients: {
                signers: [{
                  email: 'abbysemail@outlook.com',
                  name: 'Abby Abbott',
                  recipientId: '1'
                }]
              }
            }
          ],
          document: {
            documentId: 1,
            name: './test/assets/pdf-sample.pdf'
          }
        },
        {
          compositeTemplateId: 2,
          inlineTemplates: [
            {
              sequence: 2,
              recipients: {
                signers: [{
                  email: 'abbysemail@outlook.com',
                  name: 'Abby Abbott',
                  recipientId: '1'
                }]
              }
            }
          ],
          document: {
            documentId: 2,
            name: './test/assets/pdf-sample2.pdf'
          }
        }
      ]
    };

    var expectedRequest = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      multipart: [
        {
          'Content-Type': 'application/json',
          'Content-Disposition': 'form-data',
          body: JSON.stringify(body)
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample.pdf"; documentId=1; compositeTemplateId="1"',
          body: fsStub.readFileSync()
        },
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'file; filename="pdf-sample2.pdf"; documentId=2; compositeTemplateId="2"',
          body: fsStub.readFileSync()
        }
      ]
    };

    assert.deepEqual(addMultipartHeaders(body), expectedRequest);
  });

});
