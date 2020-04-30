/* ****************************************************************
 * Name: admin.js
 * Description: admin specific Internal API routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

const express = require('express');
const Book = require('../models/Book');

const logger = require('../logs');

const router = express.Router();

// check for admin user
router.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // call next middleware function
  next();
});

// get list of books
router.get('/books', async (req, res) => {
  logger.debug('Executing GET /books');
  try {
    logger.debug('Getting Books from Database...');
    const books = await Book.list();
    /* const books = [{
        name: 'dummy-1',
        slug: 'dummy-1',
        price: 49,
        createdAt: '2017-11-21T23:39:18.426+00:00',
      },
      {
        name: 'dummy-2',
        slug: 'dummy-2',
        price: 49,
        createdAt: '2017-11-21T23:39:18.426+00:00',
      },
    ]; */
    logger.debug('books = ', books);
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
