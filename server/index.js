const Discogs = require('disconnect').Client;
const express = require('express');
const creds = require('./creds.js');
const app = express();
const port = 3000;
const db = new Discogs(creds).database();

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  console.log('db', db);
});

// const col = new Discogs(creds).user().collection();
// col.getReleases('pointb', 0, null, function(err, data){
//     if (err !== null) {
//         console.warn('there was an error: ', err);
//     } else {
//         const relInfo = data.releases[0].basic_information;
//         return relInfo;
//     }
// });
