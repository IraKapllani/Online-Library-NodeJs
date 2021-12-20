const path = require('path');
const {
    check,
    body
} = require('express-validator');
const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user');

// router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);
// router.post('/logout', authController.postLogout);

// router.post(
//     '/signup',
//     [check('email')
//         .isEmail()
//         .withMessage('Please enter a valid email.')
//         .normalizeEmail()
//         .custom((value, {
//             req
//         }) => {
//             return User.findOne({
//                     email: value
//                 })
//                 .then(userDoc => {
//                     if (userDoc) {
//                         return Promise.reject('Email already exists!');
//                     }
//                 })
//         }),
//         body('password', 'Please enter a password with at least 5 characters!').isLength({
//             min: 5
//         }).isAlphanumeric().trim(),
//         body('confirmPassword').custom((value, {
//             req
//         }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Passwords have to match!');
//             }
//             return true;
//         }),
//     ],
//     authController.postSignup
// );

// router.get('/signup', authController.getSignup);

module.exports = router;