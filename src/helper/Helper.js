'use strict';

var request = require('request');
var Promise = require('promise');

var initializeRequest = require('./initializeRequest');

function Helper(config) {
  this.config = config;
}

Helper.prototype.get = function(url, body, method) {
  var self = this;

  return new Promise(function (fulfill, reject) {
    var requestParams = initializeRequest(url, method, body, self.config);

    request(requestParams, function (error, response, body) {
      var parsedBody = JSON.parse(body);

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        reject(parsedBody);
        return;
      }

      fulfill(parsedBody);
    });
  });
};

module.exports = Helper;
