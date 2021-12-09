
const path = require('path');

const booksController = require('../controllers/books');

const express = require('express');

const router = express.Router();

router.get('/', booksController.getBooks);

module.exports = router;