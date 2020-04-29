/* ****************************************************************
 * Name: Chapter.js
 * Description: Chapter model for MongoDB
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

/* Notes on MongoDB Models
 * -----------------------
 * Model is an object made from a Schema. A schema is the structure
 * of a Model's document. A document is one instance of a Model
 */

const mongoose = require('mongoose');

const Book = require('./Book');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
    required: true,
  },
  htmlContent: {
    type: String,
    default: '',
    required: true,
  },
  excerpt: {
    type: String,
    default: '',
  },
  htmlExcerpt: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  githubFilePath: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  seoTitle: String,
  seoDescription: String,
  sections: [
    {
      text: String,
      level: Number,
      escapedText: String,
    },
  ],
});

class ChapterClass {
  // get a chapter by slug
  static async getBySlug({ bookSlug, chapterSlug, user }) {
    const book = await Book.getBySlug({ slug: bookSlug, user });
    if (!book) {
      throw new Error('Book Not found!');
    }
    const chapter = await this.findOne({ bookId: book._id, slug: chapterSlug });

    if (!chapter) {
      throw new Error('Chapter Not dound!');
    }

    const chapterObj = chapter.toObject();
    chapterObj.book = book;

    return chapterObj;
  }
}

// indexes to ensure uniqueness
mongoSchema.index({ bookId: 1, slug: 1 }, { unique: true });
mongoSchema.index({ bookId: 1, githubFilePath: 1 }, { unique: true });

mongoSchema.loadClass(ChapterClass);

const Chapter = mongoose.model('Chapter', mongoSchema);

module.exports = Chapter;
