const Book = require('../models/book');
const User = require('../models/user');
const Categories = require('../models/categories');
const Authors = require('../models/authors');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const book = require('../models/book');



//Add books, authors and categories

exports.postAddBooks = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
      }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const author = req.body.author;
    const image = req.file;
    const description = req.body.description;
    const categories= req.body.categories;
    const book = new Book({
      title: title,
      author: author,
      imageUrl: imageUrl,
      description: description,
      categories: categories,
      userId: req.user
    });
    book
      .save()
      .then(result => {
        return User.findById(req.userId);
      })
      .then(result => {
        res.status(201).json({
          message: 'Book created successfully!',
          book: book,
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  exports.postAddCategories = (req, res, next) => {
    const name = req.body.name;
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-categories', {
            pageTitle: 'Add Category',
            path: '/admin/add-categories',
            hasError: true,
            category: {
                name: name,
            },
            errorMessage: 'Invalid or Null value entered!',
            validationErrors: 'Invalid or Null value entered!'
        });
    }
    const category = new Categories({
      name: name
    });
    category
      .save()
      .then(result => {
        console.log(result);
        console.log('Created Categories');
        res.redirect('/admin/categories');
      })
      .catch(err => {
        console.log(err);
      });
  };




  exports.postAddAuthors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const name = req.body.name;
    const bio = req.body.bio;
    const author = new Authors({
      name: name,
      bio: bio
    });
    author
        .save()
        .then(result => {
          return User.findById(req.userId);
        })
        .then(result => {
          res.status(201).json({
            message: 'Book created successfully!',
            author: author,
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
  };



//Unlink file

  




  //Edit books, authors and categories

exports.postEditBooks = (req, res, next) => {
    const bookId = req.params.bookId;
     const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const categories = req.body.categories;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path;
      }
      if (!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
      }
    Book.findById(bookId).then(book => {
        if (!book) {
          const error = new Error('Could not find book.');
          error.statusCode = 404;
          throw error;
        }
        if (imageUrl !== book.imageUrl) {
        }
        book.title = title;
        book.imageUrl = imageUrl;
        book.description = description;
        book.author = author;
        book.categories = categories;
        return book.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Book updated!', book: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.postEditCategories = (req, res, next) => {
    const categoriesId = req.params.categoriesId;
     const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
    const name = req.body.name;
    Categories.findById(categoriesId).then(category => {
        if (!category) {
          const error = new Error('Could not find category.');
          error.statusCode = 404;
          throw error;
        }
        category.name = name;
        return category.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Category updated!', category: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};



exports.postEditAuthors = (req, res, next) => {
    const authorsId = req.params.authorsId;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
    const name = req.body.name;
    const bio = req.body.bio;
    Authors.findById(authorsId).then(author => {
        if (!author) {
          const error = new Error('Could not find author.');
          error.statusCode = 404;
          throw error;
        }
        author.name = name;
        author.bio = bio;
        return author.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Author updated!', author: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};



//Fetch books, authors and categories

exports.getBooks = (req, res, next) => {
    Book.find().then(books => {
        res.status(200).json({
            books: books,
            message: 'books fetched.'
        });
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};


exports.getCategories = (req, res, next) => {
    Categories.find().then(categories => {
            res.status(200).json({
                categories: categories,
                message: 'categories fetched.'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};

exports.getAuthors = (req, res, next) => {
    Authors.find().then(authors => {
        res.status(200).json({
            authors: authors,
            message: 'Authors fetched.'
        });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};



//Delete books. authors and categories

exports.postDeleteCategories = (req, res, next) => {
    const categoriesId = req.params.categoriesId;
    Categories.findByIdAndRemove(categoriesId)
        .then(author => {
            if (!author) {
                const error = new Error('Could not find category.');
                error.statusCode = 404;
                throw error;
              }
              return Categories.findByIdAndRemove(categoriesId);
        })
        .then(result => {
            res.status(200).json({ message: 'Category has been deleted.' });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};

exports.postDeleteAuthors = (req, res, next) => {
    const authorsId = req.params.authorsId;
    Authors.findByIdAndRemove(authorsId)
        .then(author => {
            if (!author) {
                const error = new Error('Could not find author.');
                error.statusCode = 404;
                throw error;
              }
              return Authors.findByIdAndRemove(authorsId);
        })
        .then(result => {
            res.status(200).json({ message: 'Author has been deleted.' });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};


exports.postDeleteBooks = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findByIdAndRemove(bookId)
        .then(book => {
            if (!book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
              }
              return Book.findByIdAndRemove(bookId);
        })
        .then(result => {
            res.status(200).json({ message: 'Book has been deleted.' });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};