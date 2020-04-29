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
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  githubLastCommitSha: String,
});

// static methods
class BookClass {
  // get a list of books
  static async list({ offset = 0, limit = 10 }) {
    const books = await this.find({})
      .sort({ createdAt: -1 }) // most recent to least recent
      .skip(offset) // support pagination
      .limit(limit);
    return { books };
  }

  // get a book and it's chapters
  static async getBySlug({ slug }) {
    const bookDoc = await this.findOne({ slug });
    if (!bookDoc) {
      throw new Error('Book not found');
    }

    const book = bookDoc.toObject();

    
    return book;
  }

  static async add({ name, price, githubRepo }) {
    // some code
  }

  static async edit({ id, name, price, githubRepo }) {
    // some code
  }
}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

module.exports = Book;
