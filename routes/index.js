const product = require('./productController');

module.exports = (app) => {
  app.use('/product', product);
  // etc..
};
