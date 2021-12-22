const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

module.exports = mongoose.model('Categories', categoriesSchema);