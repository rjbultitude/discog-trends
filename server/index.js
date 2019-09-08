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
const configureCSP = require('./csp.js');
const configureCors = require('./cors.js');
const getStaticData = require('./get-static-data.js');
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

// Security policy
configureCSP(app);
// CORS
const corsOptions = configureCors(port);

// Tell Node how to handle the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Search requests
app.post('/api/search', corsOptions, function(req, res) {
  db.search(req.body.searchTerm, req.body.params, (err, data) => {
    if (err !== null) {
      console.warn('error running search', err);
      getStaticData(res);
      return;
    }
    // console.log('post data', data);
    res.send(data);
  });
});

// Run app from root
app.use(express.static('./'));

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// Configure Parcel middleware
// to serve app in development mode
const bundler = new Bundler('./index.html', options);
app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
