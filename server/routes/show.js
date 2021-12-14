const path = require('path');

const showController = require('../controllers/show');

const express = require('express');

const router = express.Router();

router.get('/', showController.getIndex);
router.get('/books', showController.getBooks);
router.get('/books/:bookId', showController.getBook);
// router.get('/reservations', showController.getReservations);
// router.post('/reservations', showController.postReservations);
// router.post('/delete-reservation', showController.postDeleteReservations);
// router.get('/cancel', showController.getCancel);
// router.get('/reservationlist', showController.getReservationsList);

module.exports = router;