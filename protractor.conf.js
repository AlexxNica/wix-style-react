const path = require('path');

module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  chromeDriver: path.resolve('node_modules/chromedriver/bin/chromedriver'),

  onPrepare() {
    browser.ignoreSynchronization = true;
  },
};
