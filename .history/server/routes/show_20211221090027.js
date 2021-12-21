const path = require('path');

const showController = require('../controllers/show');

const isAuth = require('../middleware/is-auth');

const express = require('express');

const router = express.Router();

router.get('/', showController.getIndex);
router.get('/books', showController.getBooks);
router.get('/authors', showController.getAuthors);
router.get('/books/:bookId', showController.getBook);
// router.get('/reservations', isAuth,  showController.getReservations);
// router.post('/reservations', isAuth, showController.postReservations);
// router.post('/delete-reservation', isAuth, showController.postDeleteReservations);


module.exports = router;