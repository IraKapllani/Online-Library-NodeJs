const mongodb = require('mongodb');
const Book = require('../models/book');

const ObjectId = mongodb.ObjectId;


exports.getAddBooks = (req, res, next) => {
    res.render('admin/edit-books', {
        pageTitle: 'Add Books',
        path: '/admin/add-books',
        editing: false
    });
};


exports.postAddBooks = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const author = req.body.author;
    const description = req.body.description;
    const book = new Book(title, imageUrl, author, description);
    book.save().then(result => {
        console.log('Created Book');
        res.redirect('/admin/books');
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
        });
    })
    .catch(err => console.log(err));
       
};

exports.postEditBooks = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedAuthor = req.body.author;
    const updatedDescription = req.body.description;

    const book = new Book(
        updatedTitle,
        updatedImageUrl, 
        updatedAuthor,
        updatedDescription,
        new ObjectId(bookId)
        );
    book.save().then(result => {
        console.log('Updated Book');
        res.redirect('/admin/books')
    })
    .catch(err => console.log(err));
};

exports.getBooks = (req, res, next) => {
    Book.fetchAll().then(books => {
        res.render('admin/book-list-admin', {
            books: books,
            pageTitle: 'Admin List Of Books',
            path: '/admin/books',
    });  
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };
  