const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, author) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.author = author;
    }
    save() {
        this.id = Math.random().toString();
      getBooksFromFile(books  => {
          books.push(this);
          fs.writeFile(p, JSON.stringify(books), (err)=> {
              console.log(err);
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