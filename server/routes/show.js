
const path = require('path');

const showController = require('../controllers/show');

const express = require('express');

const router = express.Router();

router.get('/', showController.getIndex);
router.get('/books', showController.getBooks);
router.get('/reservations', showController.getReservations);
router.get('/cancel', showController.getCancel);

module.exports = router;