/* ****************************************************************
 * Name: app.js
 * Description: application entry page for Express
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

// official example of setting up a Next Server with Express
// https://github.com/zeit/next.js#custom-server-and-routing

// Express Session Docs
// https://github.com/expressjs/session

// Import modules
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');

const User = require('./models/User');

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

  // Set up Express Sessions
  // and MongoDB Session store
  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: 'builderbook.sid',
    secret: 'ocEGqt8Mj6x0#^H$$G5ai2Aql',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 * 1000,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };

  server.use(session(sess));

  // temp handler to pass in user
  // info for pages
  server.get('/', async (req, res) => {
    // test value for session
    req.session.foo = 'bar';
    // const user = { email: 'team@builderbook.org' };
    const user = await User.findOne({ slug: 'team-builder-book' });
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
