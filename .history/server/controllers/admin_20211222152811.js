const Book = require('../models/book');
const User = require('../models/user');
const Categories = require('../models/categories');
const Authors = require('../models/authors');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const book = require('../models/book');

exports.getAddBooks = (req, res, next) => {

    res.render('admin/edit-books', {
        pageTitle: 'Add Books',
        path: '/admin/add-books',
        hasError: false,
        errorMessage: null,
    });
};


exports.getAddCategories = (req, res, next) => {
    res.render('admin/edit-categories', {
        pageTitle: 'Add Categories',
        path: '/admin/add-categories',
        hasError: false,
        errorMessage: null,
    });
};

exports.getAddAuthors = (req, res, next) => {
    res.render('admin/edit-authors', {
        pageTitle: 'Add Authors',
        path: '/admin/add-authors',
        hasError: false,
        errorMessage: null,
    });
};

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
    const title = req.body.title;
    const author = req.body.author;
    const image = req.file;
    const description = req.body.description;
    const categories= req.body.categories;
    const imageUrl = image.path;
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
      bio: bio,
      userId: req.user
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


exports.getEditBooks = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                return res.redirect('/');
            }
            res.render('admin/edit-books', {
                pageTitle: 'Edit Book',
                path: '/admin/edit-books',
                editing: editMode,
                book: book,
                hasError: false,
                errorMessage: null,
            });
        })
        .catch(err => console.log(err));
};


exports.getEditCategories = (req, res, next) => {
    const categoriesId = req.params.categoriesId;
    Categories.findById(categoriesId)
        .then(category => {
            if (!category) {
                return res.redirect('/');
            }
            res.render('admin/edit-categories', {
                pageTitle: 'Edit Category',
                path: '/admin/edit-categories',
                editing: editMode,
                category: category,
                hasError: false,
                errorMessage: null,
            });
        })
        .catch(err => console.log(err));
};


exports.getEditAuthors = (req, res, next) => {
    const authorsId = req.params.authorsId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
      }
      const name = req.body.name;
      const bio = req.body.bio;
    Authors.findById(authorsId)
        .then(author => {
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


const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };
  

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
          clearImage(book.imageUrl);
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
    const categoriesId = req.body.categoriesId;
    const updatedName = req.body.name;
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-categories', {
            pageTitle: 'Edit Category',
            path: '/admin/edit-categories',
            hasError: true,
            category: {
                name: updatedName,
                _id: categoriesId
            },
            errorMessage: errors.array()[0].msg,
        });
    }
    Categories.findById(categoriesId).then(category => {
        category.name = updatedName;
        return category.save();
    }).then(result => {
            console.log('Updated Category');
            res.redirect('/admin/categories')
        })
        .catch(err => {
            return res.status(500).render('admin/edit-categories', {
                pageTitle: 'Edit Category',
                path: '/admin/edit-categories',
                hasError: true,
                category: {
                    name: name,
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: []
            });
        });
};


exports.postEditAuthors = (req, res, next) => {
    const authorsId = req.body.authorsId;
    const updatedName = req.body.name;
    const updatedBio = req.body.bio
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-authors', {
            pageTitle: 'Edit Authors',
            path: '/admin/edit-authors',
            hasError: true,
            author: {
                name: updatedName,
                bio: updatedBio,
                _id: authorsId
            },
            errorMessage: errors.array()[0].msg,
        });
    }
    Authors.findById(authorsId).then(author => {
        author.name = updatedName;
        author.bio = updatedBio;
        return author.save();
    }).then(result => {
            console.log('Updated Author');
            res.redirect('/admin/authors')
        })
        .catch(err => {
            return res.status(500).render('admin/edit-authors', {
                pageTitle: 'Edit Author',
                path: '/admin/edit-authors',
                hasError: true,
                author: {
                    name: name,
                    bio: bio
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: []
            });
        });
};

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