const cors = require('cors');

module.exports = function(port) {
  // Setup CORS
  const whitelist = [`http://localhost:${port}`, 'http://discogstrends.com'];
  return cors({
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
  });
}
