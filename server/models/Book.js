/* eslint-disable no-use-before-define */
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
const generateSlug = require('../utils/slugify');

// Chapter imported at end of file to avoid circular dependency

const logger = require('../logs');

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
    default: Date.now,
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
  static async list({ offset = 0, limit = 10 } = {}) {
    logger.debug('Executing BookClass.List...');
    const books = await this.find({})
      .sort({ createdAt: -1 }) // most recent to least recent
      .skip(offset) // support pagination
      .limit(limit);
    logger.debug('Books List From DB = ', books);
    return { books };
  }

  // get a book and it's chapters
  static async getBySlug({ slug }) {
    const bookDoc = await this.findOne({ slug });
    if (!bookDoc) {
      throw new Error('Book not found');
    }

    const book = bookDoc.toObject();

    book.chapters = (
      await Chapter.find({ bookId: book._id }, 'title slug').sort({ order: 1 })
    ).map((chapter) => chapter.toObject());

    return book;
  }

  // add a new book
  static async add({ name, price, githubRepo }) {
    const slug = await generateSlug(this, name);

    if (!slug) {
      throw new Error('Error with slug generation for name: ${name');
    }

    return this.create({
      name,
      slug,
      price,
      githubRepo,
    });
  }

  // edit a book
  static async edit({ id, name, price, githubRepo }) {
    const book = await this.findById(id, 'slug name');

    if (!book) {
      throw new Error('Book is not found by id');
    }

    const modifier = { price, githubRepo };

    if (name !== book.name) {
      modifier.name = name;
      modifier.slug = await generateSlug(this, name);
    }

    const editedBook = await this.findOneAndUpdate(
      { _id: id },
      { $set: modifier },
      { fields: 'slug', new: true },
    );

    return editedBook;
  }
}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

module.exports = Book;

const Chapter = require('./Chapter');
