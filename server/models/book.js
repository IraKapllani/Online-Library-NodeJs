const fs = require('fs');
const path = require('path');

const Reservations = require('./reservations');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'books.json'
);

const getBooksFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
           return cb([]);
        }
        cb (JSON.parse(fileContent));
    });
}

module.exports = class Book {
    constructor(id, title, imageUrl, author, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.author = author;
        this.description = description;
    }
    save() {
      getBooksFromFile(books  => {
        if(this.id){
            const existingBookIndex = books.findIndex(book => book.id === this.id);
            const updatedBooks = [...books];
            updatedBooks[existingBookIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedBooks), (err)=> {
                console.log(err);
            }); 
        }
        else {
          this.id = Math.random().toString();
          books.push(this);
          fs.writeFile(p, JSON.stringify(books), (err)=> {
            console.log(err);
          }); 
        }
      });
    }

    static deleteById(id) {
        getBooksFromFile(books => {
            const book = books.find(book => book.id === id);
            const updatedBooks = books.filter(book => book.id !== id);
            fs.writeFile(p, JSON.stringify(updatedBooks), err => {
               if (!err){
                    Reservations.deleteById(id);
               }
            });
        });
    }
    
    static fetchAll(cb){
        getBooksFromFile(cb);
    }

    static findBookById(id, cb){
        getBooksFromFile(books => {
            const book = books.find(p => p.id === id);
            cb(book);
        });
    }

    
};