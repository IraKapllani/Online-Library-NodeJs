
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

router.get('/edit-books/:bookId', adminController.getEditBooks);

router.post('/edit-books', adminController.postEditBooks);

router.post('/delete-books', adminController.postDeleteBooks);

module.exports = router;
// exports.books = books;