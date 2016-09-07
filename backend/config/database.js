'use strict';

// http://tinyurl.com/zx7b62v

const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;
