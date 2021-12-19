const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      bio: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Authors', authorsSchema);