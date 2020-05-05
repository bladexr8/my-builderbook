/* ****************************************************************
 * Name: public.js
 * Description: public Internal API routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

const express = require('express');
const Book = require('../models/Book');
const Chapter = require('../models/Chapter');

const router = express.Router();

const logger = require('../logs');

// get books for a user
router.get('/books', async (req, res) => {
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

// get a book
router.get('/books/:slug', async (req, res) => {
  try {
    const book = await Book.getBySlug({ slug: req.params.slug, userId: req.user && req.user.id });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

// get a chapter of a book
router.get('/get-chapter-detail', async (req, res) => {
  try {
    logger.debug('Executing public endpoint /get-chapter-detail...');
    // object destructuring to automatically extract
    // info we want from request query string
    const { bookSlug, chapterSlug } = req.query;
    const chapter = await Chapter.getBySlug({
      bookSlug,
      chapterSlug,
    });
    res.json(chapter);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
