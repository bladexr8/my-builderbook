/* ****************************************************************
 * Name: google.js
 * Description: Google Login functionality
 * Author: Stephen Moss
 * Date: 27/04/2020
 * *************************************************************** */

// Passport Docs - http://www.passportjs.org/docs/configure/

const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/User');

function auth({ ROOT_URL, server }) {
  // passport verify callback
  // will receive tokens and user
  // profile from google
  // process google response
  // NOTE: "verified" is a callback required
  //       by passport. Arguments are (err, user, info)
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    // eslint-disable-next-line no-console
    console.log(
      `[INFO][google.js][verify] Access Token: ${accessToken}, Refresh Token: ${refreshToken}`,
    );

    // get first email address
    if (profile.emails) {
      email = profile.emails[0].value;
    }

    // profile picture
    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }

    try {
      // if new user create them, otherwise
      // find them in DB
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      // user verified successfully, execute callback
      // eslint-disable-next-line no-console
      console.log(`[INFO][google.js][signIn] User: ${JSON.stringify(user)}`);
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  // use passport strategy
  passport.use(
    new Strategy(
      {
        clientID: process.env.Google_clientID,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify,
    ),
  );

  // to allow user to stay logged in, Passport
  // associates a session with a user by saving
  // their user id to the session
  // Note sessions are stored in MongoDB
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // if cookie from browser matches with session,
  // take the is and find user in database
  // passport passes the user object to req.user
  // so the withAuth component knows we have a
  // logged in user
  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });

  // Initialize passport AND
  // save session to keep user logged in (via browser cookie)
  server.use(passport.initialize());
  server.use(passport.session());

  // Express routes

  // authentication
  server.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    }),
  );

  // OAuth callback
  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.redirect('/');
    },
  );

  // logout
  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
}

module.exports = auth;
