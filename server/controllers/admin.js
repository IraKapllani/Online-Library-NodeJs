const Book = require('../models/book');


exports.getAddBooks = (req, res, next) => {
    res.render('admin/add-books', {
        pageTitle: 'Add Books',
        path: '/admin/add-books',
        formsCSS: true,
        booksCSS: true,
        activeAddBooks: true
    });
}


exports.postAddBooks = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const author = req.body.author;
    const description = req.body.description;
    const book = new Book(title, imageUrl, author, description);
    book.save();
    res.redirect('/');
}

exports.getBooks = (req, res, next) => {
    Book.fetchAll((books) => {
            res.render('admin/book-list-admin', {
                books: books,
                pageTitle: 'Admin List Of Books',
                path: '/admin/books',
            });
        }
    );
}