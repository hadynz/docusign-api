'use strict';

var nconf = require('nconf');

/**
 * Setup nconf to retrieve configuration parameters in-order from:
 *  1. Command-line arguments
 *  2. Environment variables
 *  3. Config file located at './config.dev.json' (stub-only version checked-in to GitHub)
 */
nconf
  .argv()
  .env()
  .file({ file: './config.dev.json' });

module.exports = {
  email: nconf.get('email'),
  password: nconf.get('password'),
  integratorKey: nconf.get('key')
};
