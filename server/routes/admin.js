const express = require('express');

const router = express.Router();

const path = require('path');

const rootDir = require('../util/path');

const books = [];

router.get( '/add-books', (req, res, next)=>{
   res.sendFile(path.join(__dirname, '../', 'views', 'add-books.html'));
});

router.post( '/add-books', (req, res, next)=>{
    books.push({title: req.body.title});
   res.redirect('/');
});



exports.routes = router;
exports.books = books;