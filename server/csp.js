const csp = require('helmet-csp');

module.exports = function(app) {
  // Setup CSP
  app.use(
    csp({
      // Specify directives as normal.
      directives: {
        defaultSrc: ["'self'", 'http://localhost', '*.discogs.com'],
        scriptSrc: ["'self'", 'http://localhost', '*.discogs.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'http://localhost', '*.discogs.com'],
        fontSrc: ['fonts.gstatic.com'],
      }
    })
  );
}
