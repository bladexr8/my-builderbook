/* ****************************************************************
 * Name: EmailTemplate.js
 * Description: Mongoose Model for EmailTemplate collection
 * Author: Stephen Moss
 * Date: 28/04/2020
 * *************************************************************** */

const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../logs');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

// get an email template
async function getEmailTemplate(name, params) {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(`No EmailTemplates found.
      Please check that at least one is generated at server startup,
      restart your server and try again.`);
  }

  return {
    message: _.template(source.message)(params),
    subject: _.template(source.subject)(params),
  };
}

// function to insert EmailTemplates into Database if they don't exist
async function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to builderbook',
      message: `<%= userName %>,
        <p>
          Thanks for signing up for Builder Book!
        </p>
        <p>
          In our books, we teach you how to build complete, production-ready web apps from scratch.
        </p>

        Stephen, Builder Book
      `,
    },
  ];

  // iterate through templates and insert
  // if doesn't exist
  templates.forEach(async (template) => {
    if ((await EmailTemplate.find({ name: template.name }).count()) > 0) {
      return;
    }

    EmailTemplate.create(template).catch((error) => {
      logger.error('EmailTemplate insertion error:', error);
    });
  });
}

exports.insertTemplates = insertTemplates;
exports.getEmailTemplate = getEmailTemplate;
