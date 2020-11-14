const dotenv = require('dotenv');

module.exports = (function getCreds() {
  // Make env available
  dotenv.config();

  return {
    consumerKey: process.env.consumer_key,
    consumerSecret: process.env.consumer_secret,
  };
})();
