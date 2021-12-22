const path = require('path');

const express = require('express');

const {
    check,
    body
} = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-auth');



router.get('/add-books', isAuth,  adminController.getAddBooks);

router.get('/add-categories', isAuth, adminController.getAddCategories);

router.get('/add-authors', isAuth, adminController.getAddAuthors);

router.get('/authors', isAuth, adminController.getAuthors);

router.get('/categories', isAuth, adminController.getCategories);

router.get('/books', isAuth, adminController.getBooks);

router.post(
    '/add-books',
    [
      body('title', 'Invalid or missing value!')
        .isString()
        .isLength({ min: 3 })
        .trim(),
      body('author')
      .isString()
      .isLength({ min: 3 })
      .trim(),
      body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
    ],
    isAuth,
    adminController.postAddBooks
  );

  router.post(
    '/add-authors',
    isAuth,
    [
        body('name', 'Invalid or missing value!')
          .isString()
          .isLength({ min: 3 })
          .trim(),
      ],
    isAuth,
    adminController.postAddAuthors
  );


  router.post(
    '/add-categories',
    [
        body('name', 'Invalid or missing value!')
          .isString()
          .isLength({ min: 3 })
          .trim(),
      ],
    isAuth,
    adminController.postAddCategories
  );

router.get('/edit-books/:bookId', isAuth,  adminController.getEditBooks);

router.get('/edit-categories/:categoriesId', isAuth,  adminController.getEditCategories);

router.get('/edit-authors/:authorsId', isAuth,  adminController.getEditAuthors);

router.put(
    '/edit-books/:bookId',
    [
      body('title', 'Invalid or missing value!')
        .isString()
        .isLength({ min: 3 })
        .trim(),
      body('author')
      .isString()
      .isLength({ min: 3 })
      .trim(),
      body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
    ],
    isAuth,
    adminController.postEditBooks
  );

  router.put(
    '/author/:authorId',
    isAuth,
    [
      body('name')
        .trim()
        .isLength({ min: 5 }),
      body('bio')
        .trim()
        .isLength({ min: 5 })
    ],
    adminController.getEditAuthors
  );
 

router.delete('/books/:bookId', isAuth, adminController.postDeleteBooks);

router.delete('/authors/:authorsId', isAuth, adminController.postDeleteAuthors);


router.delete('/categories/:categoriesId', isAuth, adminController.postDeleteCategories);



module.exports = router;
