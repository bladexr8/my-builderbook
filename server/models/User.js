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

const User = mongoose.model('User', mongoSchema);

module.exports = User;
