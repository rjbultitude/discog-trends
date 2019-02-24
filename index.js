const Discogs = require('disconnect').Client;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const creds = require('./server/creds.js');
const app = express();
const port = 8080;
const db = new Discogs(creds).database();

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

//app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/search', cors(corsOptions), function (req, res) {
  console.log('req.headers', req.headers);
  console.log('req.body', req.body);
  console.log('typeof req.body', typeof req.body);
  db.search(req.body.searchTerm, req.body.params, (err, data) => {
    if (err !== null) {
        console.warn(err);
        return;
    }
    // console.log('post data', data);
    res.send(data.results);
  });
});

// app.get('/api/search', function (req, res) {
//   // TBC
// });

app.use(express.static('./'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  //console.log('db', db);
});
