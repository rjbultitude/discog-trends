const fs = require('fs');

module.exports = function getStaticData(res) {
  fs.readFile('./data.json', 'utf8', (err, staticdata) => {
    if (err) {
      throw err;
    }
    const staticdataJSON = JSON.parse(staticdata);
    res.send(staticdataJSON);
  });
}
