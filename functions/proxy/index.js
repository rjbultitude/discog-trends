// Proxy for Discogs API

// 3rd party dependencies
const Discogs = require('disconnect').Client;
// Local files
const creds = require('./creds.js');

const db = new Discogs(creds).database();

// Search requests
exports.handler = async function startSearch(event) {
  // const queryString = new URLSearchParams(
  //   event.queryStringParameters
  // ).toString();
  try {
    const results = await db.search(event.queryStringParameters);
    return results;
  } catch (err) {
    console.warn('error in promise', err);
    return err;
  }
};
