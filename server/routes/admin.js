const path = require('path');

const express = require('express');

const {
    check,
    body
} = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-auth');



//Get

router.get('/admin/authors', isAuth, adminController.getAuthors);

router.get('/admin/categories', isAuth, adminController.getCategories);

router.get('/admin/books', isAuth, adminController.getBooks);

//Add



router.post(
    '/admin/add-books',
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
    '/admin/add-authors',
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
    '/admin/add-categories',
    [
        body('name', 'Invalid or missing value!')
          .isString()
          .isLength({ min: 3 })
          .trim(),
      ],
    isAuth,
    adminController.postAddCategories
  );


  //Edit

router.put(
    '/admin/edit-books/:bookId',
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
    '/admin/author/:authorsId',
    isAuth,
    [
      body('name')
        .trim()
        .isLength({ min: 5 }),
      body('bio')
        .trim()
        .isLength({ min: 5 })
    ],
    adminController.postEditAuthors
  );
 

  router.put(
    '/admin/category/:categoriesId',
    isAuth,
    [
      body('name')
        .trim()
        .isLength({ min: 5 }),
      body('bio')
        .trim()
        .isLength({ min: 5 })
    ],
    adminController.postEditAuthors

  );


  //Delete

router.delete('/admin/books/:bookId', isAuth, adminController.postDeleteBooks);

router.delete('/admin/authors/:authorsId', isAuth, adminController.postDeleteAuthors);


router.delete('/admin/categories/:categoriesId', isAuth, adminController.postDeleteCategories);



module.exports = router;
