const dotenv = require('dotenv');

module.exports = (function() {
  // Make env available
  dotenv.config();

  return {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.SECRET_KEY,
  };
})();
