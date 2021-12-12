const Book = require('../models/book')



  exports.getBooks = (req, res, next) => {
   Book.fetchAll((books) => {
       res.render('client/book-list', {
           books: books,
           pageTitle: 'Show List Of Books',
           path: '/books',
       });
        }
    );
  }

  exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findBookById(bookId, book => 
      { 
          console.log(Book);
        res.render('client/book-detail', {
             book: book,
             pageTitle: book.title, 
             path: '/books',
          });
      });
 };


  
  exports.getIndex = (req, res, next) => {
      Book.fetchAll((books) => {
              res.render('client/index', {
                  books: books,
                  pageTitle: 'Show List',
                  path: '/',
              });
          }
      );
  }

  

  
  exports.getReservations = (req, res, next) => {
      Book.fetchAll((books) => {
              res.render('client/reservations', {
                  pageTitle: 'Reservations',
                  path: '/reservations',
              });
          }
      );
  }

exports.getCancel = (req, res, next) => {
    Book.fetchAll((books) => {
            res.render('client/cancel', {
                pageTitle: 'Cancel Reservation',
                path: '/cancel',
            });
        }
    );
}

exports.getReservationsList = (req, res, next) => {
    Book.fetchAll((books) => {
            res.render('client/reservationList', {
                pageTitle: 'Cancel Reservation',
                path: '/reservationlist',
            });
        }
    );
}