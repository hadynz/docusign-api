'use strict';

var Promise = require('promise');

var initializeRequest = require('./initializeRequest');

function Helper(config, request) {
  this.config = config;
  this.request = request;
}

Helper.prototype.get = function (url, body, method) {
  var self = this;

  return new Promise(function (fulfill, reject) {
    var requestParams = initializeRequest(url, method, body, self.config);

    self.request(requestParams, function (error, response, body) {
      var parsedBody = JSON.parse(body);

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        reject(parsedBody);
        return;
      }

      fulfill(parsedBody);
    });
  });
};

Helper.prototype.validateSchema = function () {
  return new Promise(function (fulfill) {
    // TODO: validate data against a given schema
    fulfill();
  });
};

module.exports = Helper;
