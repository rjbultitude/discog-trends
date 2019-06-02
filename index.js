const Discogs = require('disconnect').Client;
const express = require('express');
const Bundler = require('parcel-bundler');
const bodyParser = require('body-parser');
const creds = require('./server/creds.js');
const app = express();
const bundler = new Bundler('./app/app.js');
const port = process.env.PORT || 8080;
const db = new Discogs(creds).database();
const configureCSP = require('./server/csp.js');
const configureCors = require('./server/cors.js');
const getStaticData = require('./server/get-static-data.js');

// Security policy
configureCSP(app);
// CORS
const corsOptions = configureCors(port);

// Tell Node how to handle the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Search requests
app.post('/api/search', corsOptions, function (req, res) {
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

// Configure Parcel middleware
// to serve app in development mode
if (process.env.NODE_ENV === 'develop') {
  app.use(bundler.middleware());
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
