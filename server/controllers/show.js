const Book = require('../models/book');
const Reservations = require('../models/reservations')



  exports.getBooks = (req, res, next) => {
    Book.fetchAll()
    .then(books => {
      res.render('client/book-list', {
        books: books,
        pageTitle: 'All Books',
        path: '/books'
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  exports.getBook = (req, res, next) => {
      const bookId = req.params.bookId;
      Book.findById(bookId)
        .then(book => {
          res.render('client/book-detail', {
            book: book,
            pageTitle: book.title,
            path: '/books'
          });
        })
        .catch(err => console.log(err));

 };


  
  exports.getIndex = (req, res, next) => {
      Book.fetchAll()
    .then(books => {
      res.render('client/index', {
        books: books,
        pageTitle: 'Show List',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  

  
//   exports.getReservations = (req, res, next) => {
//      Reservations.getResevations(reservations => {
//          Book.fetchAll(books => {
//              const reservedBooks = [];
//              for (book of books){
//                  const reservationData = reservations.books.find(b => b.id === book.id);
//                  if(reservationData){
//                     reservedBooks.push({bookData : book});
//                  }
//              }
//             res.render('client/reservations', {
//                 pageTitle: 'Reservations',
//                 path: '/reservations',
//                 books: reservedBooks
//             });
//          });
//      });      
//   };

//   exports.postReservations = (req, res, next) => {
//         const bookId = req.body.bookId; //name used in the input
//         Book.findBookById(bookId, (book) => {
//                 Reservations.addBook(bookId);
//         })
//         res.redirect('/reservations');
//   };


// exports.getCancel = (req, res, next) => {
//     Book.fetchAll((books) => {
//             res.render('client/cancel', {
//                 pageTitle: 'Cancel Reservation',
//                 path: '/cancel',
//             });
//         }
//     );
// }


// exports.postDeleteReservations = (req, res, next) => {
//     const bookId = req.body.bookId;
//     Book.findBookById(bookId, book => {
//         Reservations.deleteById(bookId);
//         res.redirect('/reservations');
//     });
// };

// exports.getReservationsList = (req, res, next) => {
//     Book.fetchAll((books) => {
//             res.render('client/reservationList', {
//                 pageTitle: 'Cancel Reservation',
//                 path: '/reservationlist',
//             });
//         }
//     );
// }










// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then(products => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findById(prodId);
//     })
//     .then(product => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity }
//       });
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then(products => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(result => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({include: ['products']})
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };
