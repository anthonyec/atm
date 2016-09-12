const env = process.env.NODE_ENV;
const knex = require('knex')(require('..//knexfile')[env]);
const bookshelf = require('bookshelf')(knex);

// http://tinyurl.com/zx7b62v
bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;
