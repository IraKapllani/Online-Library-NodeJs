const Book = require('../models/book');
const Reservations = require('../models/reservations')



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
     Reservations.getResevations(reservations => {
         Book.fetchAll(books => {
             const reservedBooks = [];
             for (book of books){
                 const reservationData = reservations.books.find(b => b.id === book.id);
                 if(reservationData){
                    reservedBooks.push({bookData : book});
                 }
             }
            res.render('client/reservations', {
                pageTitle: 'Reservations',
                path: '/reservations',
                books: reservedBooks
            });
         });
     });      
  };

  exports.postReservations = (req, res, next) => {
        const bookId = req.body.bookId; //name used in the input
        Book.findBookById(bookId, (book) => {
                Reservations.addBook(bookId);
        })
        res.redirect('/reservations');
  };


exports.getCancel = (req, res, next) => {
    Book.fetchAll((books) => {
            res.render('client/cancel', {
                pageTitle: 'Cancel Reservation',
                path: '/cancel',
            });
        }
    );
}


exports.postDeleteReservations = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.findBookById(bookId, book => {
        Reservations.deleteById(bookId);
        res.redirect('/reservations');
    });
};

exports.getReservationsList = (req, res, next) => {
    Book.fetchAll((books) => {
            res.render('client/reservationList', {
                pageTitle: 'Cancel Reservation',
                path: '/reservationlist',
            });
        }
    );
}