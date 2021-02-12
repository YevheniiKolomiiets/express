const express = require('express');
const router = express.Router();
const DictionaryService = require('./../services/dictionary.js');
const privateMiddleware = require('../middleware/privateMiddleware.js');
const validationMiddleware = require('../middleware/validationMiddleware.js');
const dictionarySchema = require('../validation/dictionarySchema.js');

router.get('/all', all);
router.post('/', privateMiddleware, validationMiddleware(dictionarySchema), add);
router.put('/:id', privateMiddleware, validationMiddleware(dictionarySchema), edit);
router.delete('/:id', privateMiddleware, remove);

async function all(req, res) {
  try {
    const response = await DictionaryService.getAll();
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

async function add(req, res) {
  try {
    const response = await DictionaryService.add(req.body);
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

async function edit(req, res) {
  try {
    const response = await DictionaryService.edit(req);
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

async function remove(req, res) {
  try {
    const response = await DictionaryService.remove(req.params);
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

module.exports = router;
