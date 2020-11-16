// Proxy for Discogs API

// 3rd party dependencies
const Discogs = require('disconnect').Client;
const express = require('express');
const Bundler = require('parcel-bundler');
const bodyParser = require('body-parser');

const app = express();
// Local files
const creds = require('./creds.js');

const port = process.env.PORT || 8080;
const db = new Discogs(creds).database();
// Config
const isProd = process.env.NODE_ENV === 'production';
let options;
if (isProd) {
  options = {
    production: true,
    cache: false,
    minify: true,
    sourceMaps: false,
    http: true,
  };
} else {
  options = {
    cache: true,
    minify: false,
    sourceMaps: true,
    watch: true,
  };
}

// Tell Node how to handle the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Search requests
app.get('/search', async function getCB(req, res) {
  try {
    const results = await db.search(req.query);
    if (!results) {
      console.warn('error running search', results);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  } catch (err) {
    console.warn('error in promise', err);
  }
});

// Run app from root
app.use(express.static('./'));

// Configure Parcel middleware
// to serve app in development mode
const bundler = new Bundler('./src/index.html', options);
app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
