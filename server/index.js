// Proxy for Discogs API

// 3rd party dependencies
const Discogs = require('disconnect').Client;
// const Bundler = require('parcel-bundler');
// Local files
const creds = require('./creds.js');

const db = new Discogs(creds).database();
// Config
// const isProd = process.env.NODE_ENV === 'production';

// Search requests
exports.handler = async function startSearch(event, context, callback) {
  const { searchTerm, params } = event.queryStringParameters;
  console.log('searchTerm', searchTerm);
  console.log('params', params);
  const results = await db.search(searchTerm, params);
  if (results.err !== null) {
    callback(null, {
      statusCode: 500,
      body: 'Bad request',
    });
    return;
  }
  callback(null, {
    statusCode: 200,
    body: results.data,
  });
};
