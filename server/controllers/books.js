const books = [];

exports.getAddBooks = (req, res, next) => {
    res.render('add-books', {
      pageTitle: 'Add Books',
      path: '/admin/add-books',
      formsCSS: true,
      booksCSS: true,
      activeAddBooks: true
    });
  }


 exports.postAddBooks = (req, res, next) => {
    books.push({ title: req.body.title });
    res.redirect('/');
  }

  exports.getBooks = (req, res, next) => {
    res.render('show', {
      books: books,
      pageTitle: 'Show',
      path: '/',
      hasBooks: books.length > 0,
      activeShow: true,
      booksCSS: true
    });
  }