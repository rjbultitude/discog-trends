// Proxy for Discogs API

// 3rd party dependencies
const Discogs = require('disconnect').Client;
// Local files
const creds = require('./creds.js');

const db = new Discogs(creds).database();

// Search requests
exports.handler = async function startSearch(event, context, callback) {
  const queryString = new URLSearchParams(
    event.queryStringParameters
  ).toString();
  console.log('queryString', queryString);
  const results = await db.search(queryString);
  console.log('results', results);
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
