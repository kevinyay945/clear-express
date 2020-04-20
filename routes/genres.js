const express = require('express');
const Joi = require('joi');

const router = express.Router();

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
  return 0;
});

router.put('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
  return 0;
});

router.delete('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
  return 0;
});

router.get('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
  return 0;
});

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
 *         enum: [1]
 *       - name: pageNum
 *         description: 一頁有幾個
 *         in: query
 *         type: integer
 *         required: true
 *         enum: [1]
 *     responses:
 *       '200':
 *         description: successful response
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */


module.exports = router;
