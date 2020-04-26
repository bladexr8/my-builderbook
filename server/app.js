/* ****************************************************************
 * Name: app.js
 * Description: application entry page for Express
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

// official example of setting up a Next Server with Express
// https://github.com/zeit/next.js#custom-server-and-routing

// Import modules
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

require('dotenv').config();

// app port and root url
const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL_TEST;
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(MONGO_URL, mongoOptions);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// initialise Next Server
app.prepare().then(() => {
  const server = express();

  // temp handler to pass in user
  // info for pages
  server.get('/', (req, res) => {
    const user = { email: 'team@builderbook.org' };
    app.render(req, res, '/', { user });
  });

  // Next handler
  server.get('*', (req, res) => handle(req, res));

  // listen for connections
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`[INFO] Ready on ${ROOT_URL} port ${port}:`); // eslint-disable-line no-console
  });
});
