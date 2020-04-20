/* istanbul ignore next */
// This file is an example, it's not functionally used by the module.This
// https://github.com/Surnet/swagger-jsdoc/blob/master/example/v2/routes.js
const port = process.env.PORT || 3000;
const server = `http://localhost:${port.toString()}`;

module.exports = {
  info: {
    // API informations (required)
    version: '1.0.0', // Version (required)
    title: 'express',
    description: 'express swagger API information!!',
    contact: {
      name: '',
    },
    servers: ['http://localhost:9898'],
  },
  basePath: '/', // Base path (optional)
  apis: ['../routes/*.js', '../model/*.js'],
};
