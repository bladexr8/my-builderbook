/* ****************************************************************
 * Name: User.js
 * Description: User model for MongoDB
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

/* Notes on MongoDB Models
 * -----------------------
 * Model is an object made from a Schema. A schema is the structure
 * of a Model's document. A document is one instance of a Model
 */

const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');
const logger = require('../logs');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,

  isGithubConnected: {
    type: Boolean,
    default: false,
  },
  githubAccessToken: {
    type: String,
  },
});

// add class methods to Model
class UserClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin', 'isGithubConnected'];
  }

  // user signin/sign up
  // if user exists, find them,
  // otherwise create them
  static async signInOrSignUp({ googleId, email, googleToken, displayName, avatarUrl }) {
    const user = await this.findOne({ googleId }).select(UserClass.publicFields().join(' '));

    logger.debug(`[User.js][signIn] Google Token: ${JSON.stringify(googleToken)}`);
    // if user is found
    if (user) {
      const modifier = {};

      // prepare token updates (if required)
      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken;
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refresh_token;
      }

      // no user updates
      if (_.isEmpty(modifier)) {
        return user;
      }

      // user updates required
      await this.updateOne({ googleId }, { $set: modifier });
      return user;
    }

    // user not found
    const slug = await generateSlug(this, displayName);
    const userCount = await this.find().countDocuments();

    logger.debug(`[User.js] Creating User...`);
    logger.debug(`[User.js] Google Token: ${JSON.stringify(googleToken)}`);
    const newUser = await this.create({
      createdAt: new Date(),
      googleId,
      email,
      googleToken,
      displayName,
      avatarUrl,
      slug,
      isAdmin: userCount === 0,
    });

    return _.pick(newUser, UserClass.publicFields());
  }
}

// load the class into Model
mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
