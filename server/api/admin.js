/* ****************************************************************
 * Name: admin.js
 * Description: admin specific Internal API routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

const express = require('express');
const Book = require('../models/Book');

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
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
