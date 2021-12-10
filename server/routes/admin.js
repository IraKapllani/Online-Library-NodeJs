
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const books = [];

// /admin/add-books => GET
router.get('/add-books', adminController.getAddBooks);

//route to show added books in admin panel
router.get('/books', adminController.getBooks);

router.post('/add-books', adminController.postAddBooks);

module.exports = router;
// exports.books = books;