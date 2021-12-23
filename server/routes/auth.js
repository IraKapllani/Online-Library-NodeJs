const path = require('path');
const {
    check,
    body
} = require('express-validator');
const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user');


router.post('/login', authController.postLogin);


module.exports = router;