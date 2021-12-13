const Book = require('../models/book');


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
    const book = new Book(null, title, imageUrl, author, description);
    book.save();
    res.redirect('/');
};

exports.getEditBooks = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const bookId = req.params.bookId;
    Book.findBookById(bookId, book => {
        if(!book){
            return res.redirect('/');
        }
        res.render('admin/edit-books', {
            pageTitle: 'Edit Book',
            path: '/admin/edit-books',
            editing: editMode,
            book: book,
        });
    });
};

exports.postEditBooks = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedAuthor = req.body.author;
    const updatedDescription = req.body.description;
    const updatedBook = new Book(
        bookId, 
        updatedTitle, 
        updatedImageUrl, 
        updatedAuthor,
         updatedDescription
         );
    updatedBook.save();
    res.redirect('/admin/books');
};

exports.getBooks = (req, res, next) => {
    Book.fetchAll((books) => {
        res.render('admin/book-list-admin', {
            books: books,
            pageTitle: 'Admin List Of Books',
            path: '/admin/books',
        });
    });
};


exports.postDeleteBooks = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.deleteById(bookId);
    res.redirect('/admin/books');
};