const dotenv = require('dotenv');

module.exports = (function() {
  // Make env available
  dotenv.config();
  console.log('process.env.CONSUMER_KEY', process.env.CONSUMER_KEY);

  return {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.SECRET_KEY,
  };
})();
