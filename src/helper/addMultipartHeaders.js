'use strict';

var path = require('path');
var _ = require('lodash');

function yieldDocuments(body) {
  if (body.compositeTemplates) {
    return _.map(body.compositeTemplates, function(template){
      var document = _.clone(template.document);

      if (template.compositeTemplateId) {
        document.compositeTemplateId = template.compositeTemplateId;
      }

      return document;
    });
  }

  if (body.documents) {
    return body.documents;
  }

  return [];
}

module.exports = function(readFileSync) {
  return function (body) {
    var request = {};
    var documents = yieldDocuments(body);

    // No documents attached. This is not a multi-part request
    if (documents.length === 0) {
      return request;
    }

    request.headers = {
      'Content-Type': 'multipart/form-data'
    };

    request.multipart = [
      {
        'Content-Type': 'application/json',
        'Content-Disposition': 'form-data',
        body: JSON.stringify(body)
      }
    ];

    documents.forEach(function (document) {
      // Use document pretty name if provided or extract from path (e.g. '/bla/foo.pdf' -> 'foo.pdf')
      var displayName = document.displayName || path.basename(document.name);
      var compositeTemplateId = document.compositeTemplateId ? '; compositeTemplateId="' + document.compositeTemplateId + '"' : '';

      request.multipart.push({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'file; filename="' + displayName + '"; documentId=' + document.documentId + compositeTemplateId,
        body: readFileSync(document.name)
      });
    });

    return request;
  };
};
