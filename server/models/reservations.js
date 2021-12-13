const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'reservations.json'
);


module.exports = class Reservations {
    static addBook(id) {
        fs.readFile(p, (err, fileContent) => {
            let reservations = {
                books: []
            };
            if (!err) {
                reservations = JSON.parse(fileContent);
            }
            const existingBookIndex = reservations.books.findIndex(book => book.id === id);
            const existingBook = reservations.books[existingBookIndex];
            let updatedBook;
            if (existingBook) {
                updatedBook = {
                    ...existingBook
                };
                reservations.books = [...reservations.books];
                reservations.books[existingBookIndex] = updatedBook;
            } else {
                updatedBook = {
                    id: id,
                };
                reservations.books = [...reservations.books, updatedBook];

            }
            fs.writeFile(p, JSON.stringify(reservations), err => {
                console.log(err);
            });
        });
    }

    static deleteById(id) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedReservations = {
                ...JSON.parse(fileContent)
            };
            const book = updatedReservations.books.find(book => book.id === id);
            if(!book){
                return;
            }
            updatedReservations.books = updatedReservations.books.filter(book => book.id !== id);

            fs.writeFile(p, JSON.stringify(updatedReservations), err => {
                console.log(err);
            });
        });
    }

    static getResevations(cb) {
        fs.readFile(p, (err, fileContent) => {
            const reservations = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(reservations);
            }
        });
    }

}