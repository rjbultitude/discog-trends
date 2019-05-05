const Discogs = require('disconnect').Client;
const express = require('express');
const Bundler = require('parcel-bundler');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const creds = require('./server/creds.js');
const app = express();
const bundler = new Bundler('./app/app.js');
const port = process.env.PORT || 8080;
const db = new Discogs(creds).database();
const csp = require('helmet-csp');

// Setup CSP
app.use(
  csp({
    // Specify directives as normal.
    directives: {
      defaultSrc: ["'self'", '*.discogs.com'],
      scriptSrc: ["'self'",],
      styleSrc: ["'self'"],
    }
  })
);

// Setup CORS
const whitelist = [`http://localhost:${port}`, 'http://discogstrends.com'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

// Tell Node how to handle the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function getStaticData(res) {
  fs.readFile('./data.json', 'utf8', (err, staticdata) => {
    if (err) {
      throw err;
    }
    const staticdataJSON = JSON.parse(staticdata);
    res.send(staticdataJSON);
  });
}

// Search requests
app.post('/api/search', cors(corsOptions), function (req, res) {
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
