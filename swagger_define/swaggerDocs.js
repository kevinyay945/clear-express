const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDef');

// swagger
const swaggerOption = {
  swaggerDefinition,
  apis: ['./routes/*.js', './swagger_define/models/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOption);

module.exports = swaggerDocs;
