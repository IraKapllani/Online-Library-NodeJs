const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Book {
    constructor(title, author, description, imageUrl, id) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('books').updateOne({_id: this._id}, {$set: this });
        } else {
            dbOp = db
                .collection('books')
                .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('books')
            .find()
            .toArray()
            .then(books => {
                console.log(books);
                return books;
            })
            .catch(err => {
                console.log(err);
            });
    }


    static findById(bookId) {
        const db = getDb();
        return db
            .collection('books')
            .find({
                _id: new mongodb.ObjectId(bookId)
            })
            .next()
            .then(book => {
                console.log(book);
                return book;
            })
            .catch(err => {
                console.log(err);
            });
    }
    static deleteById(bookId) {
        const db = getDb();
        return db
          .collection('books')
          .deleteOne({ _id: new mongodb.ObjectId(bookId) })
          .then(result => {
            console.log('Deleted');
          })
          .catch(err => {
            console.log(err);
          });
      }
    }



module.exports = Book;