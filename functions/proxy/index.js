// Proxy for Discogs API

// 3rd party dependencies
const Discogs = require('disconnect').Client;
// Local files
const creds = require('./creds.js');

const db = new Discogs(creds).database();

// Search requests
exports.handler = async function startSearch(event, context, callback) {
  try {
    const results = await db.search(event.queryStringParameters);
    const resultsStr = JSON.stringify(results);
    callback(null, {
      statusCode: 200,
      body: resultsStr,
    });
  } catch (err) {
    console.warn('error in promise', err);
    callback(err, null);
  }
};
