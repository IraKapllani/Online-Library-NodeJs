
const path = require('path');

const express = require('express');

const booksController = require('../controllers/books');

const router = express.Router();

const books = [];

// /admin/add-books => GET
router.get('/add-books', booksController.getAddBooks);

// /admin/add-books => POST
router.post('/add-books', booksController.postAddBooks);

module.exports = router;
// exports.books = books;