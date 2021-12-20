const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    // reservations: {
    //   items: [
    //     {
    //       bookId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Book',
    //         required: true
    //       },
    //       quantity: { type: Number, required: true }
    //     }
    //   ]
    // }
  });


// userSchema.methods.addToReservations = function(book) {
//     const reservationsBookIndex = this.reservations.items.findIndex(cp => {
//       return cp.bookId.toString() === book._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedReservationsItems = [...this.reservations.items];
//     if (reservationsBookIndex >= 0) {
//       newQuantity = this.reservations.items[reservationsBookIndex].quantity + 1;
//       updatedReservationsItems[reservationsBookIndex].quantity = newQuantity;
//     } else {
//         updatedReservationsItems.push({
//         bookId: book._id,
//         quantity: newQuantity
//       });
//     }
//     const updateReservations = {
//       items: updatedReservationsItems
//     };
//     this.reservations = updateReservations;
//     return this.save();
//   };

//   userSchema.methods.removeFromReservations = function(bookId){
//     const updatedReservationsItems = this.reservations.items.filter(item => {
//         return item.bookId.toString() !== bookId.toString();
//       });
//       this.reservations.items = updatedReservationsItems;
//       return this.save();
//   }


//   userSchema.methods.getReservations = function(book){

//     const db = getDb();
//             const bookIds = this.reservations.items.map(i => {
//                 return i.bookId;
//             });
//             return db
//                 .collection('books')
//                 .find({_id: {$in: bookIds}})
//                 .toArray()
//                 .then(books => {
//                     return books.map(b => {
//                         return {
//                             ...b,
//                             quantity: this.reservations.items.find(i => {
//                                 return i.bookId.toString() === b._id.toString();
//                             }).quantity
//                         };
//                     });
//                 });
//   }

  





module.exports = mongoose.model('User', userSchema);




// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, reservations, id) {
//       this.name = username;
//       this.email = email;
//       this.reservations = reservations; // {items: []}
//       this._id = id;
//     }


//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToReservations(book) {
//         const reservationsBookIndex = this.reservations.items.findIndex(rb => {
//           return rb.bookId.toString() === book._id.toString()
//         });
//         let newQuantity = 1;
//         const updatedReservationsItems = [...this.reservations.items];

//         if (reservationsBookIndex >= 0) {
//           newQuantity = this.reservations.items[reservationsBookIndex].quantity + 1;
//           updatedReservationsItems[reservationsBookIndex].quantity = newQuantity;
//         } else {
//             updatedReservationsItems.push({
//             bookId: new ObjectId(book._id),
//             quantity: newQuantity
//           });
//         }
//         const updatedReservations = {
//           items: updatedReservationsItems
//         };
//         const db = getDb();
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { reservations: updatedReservations } }
//           );
//       }

//     getReservations() {
//         const db = getDb();
//         const bookIds = this.reservations.items.map(i => {
//             return i.bookId;
//         });
//         return db
//             .collection('books')
//             .find({_id: {$in: bookIds}})
//             .toArray()
//             .then(books => {
//                 return books.map(b => {
//                     return {
//                         ...b,
//                         quantity: this.reservations.items.find(i => {
//                             return i.bookId.toString() === b._id.toString();
//                         }).quantity
//                     };
//                 });
//             });
//     }

//     deleteItemFromReservations(bookId){
//        const updatedReservationsItems = this.reservations.items.filter(item => {
//             return item.bookId.toString() !== bookId.toString();
//         });
//         const db = getDb();
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { reservations: {items: updatedReservationsItems} } }
//           );
//     }


//     static findById(userId) {
//         const db = getDb();
//         return db
//           .collection('users')
//           .findOne({ _id: new ObjectId(userId)})
//           .then(user => {
//             console.log(user);
//             return user;
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }

// }

// module.exports = User;