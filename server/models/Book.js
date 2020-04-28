/* ****************************************************************
 * Name: Book.js
 * Description: Book model for MongoDB
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

/* Notes on MongoDB Models
 * -----------------------
 * Model is an object made from a Schema. A schema is the structure
 * of a Model's document. A document is one instance of a Model
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  // parameters
});

// static methods
class BookClass {
  // methods
}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

module.exports = Book;
