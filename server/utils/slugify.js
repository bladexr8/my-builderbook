/* ****************************************************************
 * Name: slugify.js
 * Description: generate a unique slug for a given input value
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

const _ = require('lodash');

// initial slug
const slugify = (text) => _.kebabCase(text);

async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${count}`}, 'id');

  // slug doesn't exist
  if (!user) {
    return `${slug}-${count}`;
  }

  // slug exists
  return createUniqueSlug(Model, slug, count + 1);
}

async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name);

  const user = await Model.findOne({ slug: origSlug, ...filter }, 'id');

  // slug value doesn't already exist
  if (!user) {
    return origSlug;
  }

  // slug value already exists
  return createUniqueSlug(Model, origSlug, 1);
}

module.exports = generateSlug;
