/* ****************************************************************
 * Name: google.js
 * Description: Google Login functionality
 * Author: Stephen Moss
 * Date: 27/04/2020
 * *************************************************************** */

 const passport = require('passport');
 const Strategy = require('passport-google-oauth').OAuth2Strategy;
 const User = require('./models/User');

 function auth({ ROOT_URL, server }) {
  passport.use(
    new Strategy(
      // 1. define 'verify' function: get profile and googleToken from Google AND
      // 2. call and wait for static method 'signInOrSignUp' to return user
      {
        clientID: process.env.Google_clientID,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: `${ROOT_URL}/auth/google/callback`
      },
      verify,
    ),
  );

  // 3. serialize user AND
  // deserialize user

  // 4. initial passport AND
  // save session to keep user logged in (via browser cookie)

  // Express routes
 }

 module.exports = auth;
