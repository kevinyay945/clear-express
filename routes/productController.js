const express = require('express');
const Joi = require('joi');
const asy = require('express-async-handler');
const multer = require('multer');
const uuidV4 = require('uuid/v4');
const moment = require('moment');
const devDebugger = require('debug')('dev:product');
const dbPostgresql = require('../database/pgsql');
const logger = require('../config/logger');


const upload = multer();
const router = express.Router();

module.exports = router;

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

/**
 * @swagger
 * /product:
 *   get:
 *     summary: get products
 *     description: 欄位留空為全部查詢
 *     tags: ['product']
 *     parameters:
 *       - name: uuid
 *         description: 輸入要查詢的uuid
 *         in: query
 *         type: string
 *         format: uuid
 *         enum: [1d5c8d87-000a-474e-87af-269e5f8d3b20]
 *       - name: page
 *         description: 第幾頁
 *         in: query
 *         type: integer
 *         required: true
 *         enum: [1,2,3]
 *       - name: pageNum
 *         description: 一頁有幾個
 *         in: query
 *         type: integer
 *         required: true
 *         enum: [1,5,10]
 *     responses:
 *       '200':
 *         description: successful response
 *         schema:
 *           type: object
 *           $ref: '#/definitions/db_result'
 */

router.get('/', upload.none(), asy(async (req, res) => {
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const sql = 'SELECT uuid, name, product_uuid FROM route limit 1';
  let allProducts = {};
  try {
    allProducts = await dbPostgresql.any(sql);
    // success
  } catch (err) {
    devDebugger('ERROR:', err);
    logger.error(`sql = ${sql}`);
    logger.error(err.toString());
    res.status(500).send(err);
  }
  devDebugger(allProducts);
  res.send('12');
  return 0;
}));
