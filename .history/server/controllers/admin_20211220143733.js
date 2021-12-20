const Book = require('../models/book');
const User = require('../models/user');
const Categories = require('../models/categories');
const Authors = require('../models/authors');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.getAddBooks = (req, res, next) => {

    res.render('admin/edit-books', {
        pageTitle: 'Add Books',
        path: '/admin/add-books',
        editing: false,
        hasError: false,
        errorMessage: null,
    });
};


exports.getAddCategories = (req, res, next) => {
    res.render('admin/edit-categories', {
        pageTitle: 'Add Categories',
        path: '/admin/add-categories',
        editing: false,
        hasError: false,
        errorMessage: null,
    });
};

exports.getAddAuthors = (req, res, next) => {
    res.render('admin/edit-authors', {
        pageTitle: 'Add Authors',
        path: '/admin/add-authors',
        editing: false,
        hasError: false,
        errorMessage: null,
    });
};

exports.postAddBooks = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const image = req.file;
    const description = req.body.description;
    if(!image) {
        return res.status(422).render('admin/edit-books', {
            pageTitle: 'Add Book',
            path: '/admin/add-books',
            editing: false,
            hasError: true,
            book: {
                title: title,
                author: author,
                description: description
            },
            errorMessage: 'Attached file is not an image!',
            validationErrors: []
        });
    }
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-books', {
            pageTitle: 'Add Book',
            path: '/admin/add-books',
            editing: false,
            hasError: true,
            book: {
                title: title,
                imageUrl: imageUrl,
                author: author,
                description: description
            },
            errorMessage: errors.array()[0].msg,
        });
    }
    const imageUrl = image.path;
    const book = new Book({
      title: title,
      author: author,
      imageUrl: imageUrl,
      description: description,
      userId: req.user
    });
    book
      .save()
      .then(result => {
        console.log(result);
        console.log('Created Books');
        res.redirect('/admin/books');
      })
      .catch(err => {
        // return res.status(500).render('admin/edit-books', {
        //     pageTitle: 'Add Book',
        //     path: '/admin/add-books',
        //     editing: false,
        //     hasError: true,
        //     book: {
        //         title: title,
        //         imageUrl: imageUrl,
        //         author: author,
        //         description: description
        //     },
        //     errorMessage: errors.array()[0].msg,
        //     validationErrors: []
        // });
        // // res.redirect('/500');
        console.log(err);
      });
  };


  exports.postAddCategories = (req, res, next) => {
    const name = req.body.name;
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-categories', {
            pageTitle: 'Add Category',
            path: '/admin/add-categories',
            editing: false,
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
    const name = req.body.name;
    const bio = req.body.bio;
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-authors', {
            pageTitle: 'Add Author',
            path: '/admin/add-authors',
            editing: false,
            hasError: true,
            author: {
                name: name,
                bio: bio
            },
            errorMessage: 'Invalid or Null value entered!',
            validationErrors: 'Invalid or Null value entered!'
        });
    }
    const author = new Authors({
      name: name,
      bio: bio
    });
    author
      .save()
      .then(result => {
        console.log(result);
        console.log('Created Authors');
        res.redirect('/admin/authors');
      })
      .catch(err => {
        console.log(err);
      });
  };


exports.getEditBooks = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
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
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
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
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const authorsId = req.params.authorsId;
    Authors.findById(authorsId)
        .then(author => {
            if (!author) {
                return res.redirect('/');
            }
            res.render('admin/edit-authors', {
                pageTitle: 'Edit Author',
                path: '/admin/edit-authors',
                editing: editMode,
                author: author,
                hasError: false,
                errorMessage: null,
            });
        })
        .catch(err => console.log(err));
};

exports.postEditBooks = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedAuthor = req.body.author;
    const updatedDescription = req.body.description;
    const errors = validationResult(req);
    if(!errors.isEmpty){
       return res.status(422).render('admin/edit-books', {
            pageTitle: 'Edit Book',
            path: '/admin/edit-books',
            editing: true,
            hasError: true,
            book: {
                title: updatedTitle,
                author: updatedAuthor,
                description: updatedDescription,
                _id: bookId
            },
            errorMessage: errors.array()[0].msg,
        });
    }
    Book.findById(bookId).then(book => {
        book.title = updatedTitle;
        book.author = updatedAuthor;
        book.description = updatedDescription;
        if(image){
            book.imageUrl = image.path;
        }
        return book.save();
    }).then(result => {
            console.log('Updated Book');
            res.redirect('/admin/books')
        })
        .catch(err => {
            return res.status(500).render('admin/edit-books', {
                pageTitle: 'Edit Book',
                path: '/admin/edit-books',
                editing: false,
                hasError: true,
                book: {
                    title: title,
                    author: author,
                    description: description
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: []
            });
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
            editing: true,
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
                editing: false,
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
            editing: true,
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
                editing: false,
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
            res.render('admin/book-list-admin', {
                books: books,
                pageTitle: 'Admin List Of Books',
                path: '/admin/books',
            });
        })
        .catch(err => console.log(err));
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
    const categoriesId = req.body.categoriesId;
    console.log(req.body);
    Categories.findByIdAndRemove(categoriesId)
        .then(() => {
            console.log('Deleted category');
            res.redirect('/admin/categories');
        })
        .catch(err => console.log(err));
};

exports.postDeleteAuthors = (req, res, next) => {
    const authorsId = req.body.authorsId;
    console.log(req.body);
    Authors.findByIdAndRemove(authorsId)
        .then(() => {
            console.log('Deleted author');
            res.redirect('/admin/authors');
        })
        .catch(err => console.log(err));
};


exports.postDeleteBooks = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.findByIdAndRemove(bookId)
        .then(() => {
            console.log('Deleted book');
            res.redirect('/admin/books');
        })
        .catch(err => console.log(err));
};