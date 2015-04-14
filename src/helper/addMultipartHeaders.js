'use strict';

var fs = require('fs');
var path = require('path');

function addMultipartHeaders(request, body) {

  // No documents attached. This is not a multi-part request
  if (!body.documents || body.documents.length === 0) {
    return;
  }

  request.headers['Content-Type'] = 'multipart/form-data';
  request.multipart = [
    {
      'Content-Type': 'application/json',
      'Content-Disposition': 'form-data',
      'body': request.body
    }
  ];

  // Loop, read and attach uploaded documents as multipart elements
  body.documents.forEach(function(document){
    request.multipart.push({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'file; filename="' + path.basename(document.name) + '"; documentId=' + document.documentId,
      'body': fs.readFileSync(document.name)
    });
  });
}

module.exports = addMultipartHeaders;
