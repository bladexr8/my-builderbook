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

const api = require('./api');
const logger = require('./logs');
const { insertTemplates } = require('./models/EmailTemplate');

// Google Auth Support
const auth = require('./google');

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

// URL Map
const URL_MAP = {
  '/login': '/public/login',
};

// initialise Next Server
logger.info('Starting Application...');
app.prepare().then(async () => {
  logger.info('Initialising Express Server...');
  const server = express();

  // Set up Express Sessions
  // and MongoDB Session store
  logger.info('Initialising MongoDB Session Store...');
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

  // insert email templates
  // into database
  logger.info('Initialising App Email Templates...');
  await insertTemplates();

  // set up Google Authentication
  // (refer to google.js)
  logger.info('Initialising Google Authentication Module...');
  auth({ server, ROOT_URL });

  // set up Internal API's for Client
  api(server);

  // Next handler
  logger.info('Initialising Next.js Request Handler...');
  server.get('*', (req, res) => {
    // logger.debug(`Mapping ${req.path} to ${URL_MAP[req.path]}`);
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  // listen for connections
  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Ready on ${ROOT_URL} port ${port}:`);
  });
});
