/* ****************************************************************
 * Name: index.js
 * Description: index for Express Internal API routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

const publicApi = require('./public');
const customerApi = require('./customer');
const adminApi = require('./admin');

const logger = require('../logs');

function api(server) {
  logger.info('Setting Up Internal API Routes...');
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/customer', customerApi);
  server.use('/api/v1/admin', adminApi);
}

module.exports = api;
