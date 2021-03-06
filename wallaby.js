// wallaby.conf.js
/* eslint-disable strict */

'use strict';

/* eslint-enable strict */
const webpackConfigTest = require('./dev/config/webpack.config.test');
const wallabyWebpack = require('wallaby-webpack');
const wallabyWebpackPostprocessor = wallabyWebpack(webpackConfigTest);
let babelConfig = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '.babelrc')));
babelConfig.plugins = [];




module.exports = (wallaby) => {
  return {

    files: [
      { pattern: 'app/**/*.js', load: false, },
      { pattern: 'app/**/*spec.js', ignore: true, },
    ],
    tests: [
      { pattern: 'app/**/*spec.js', load: false, },
      { pattern: 'app/index.spec.js', ignore: true, },
    ],
    testFramework: 'mocha',
    compilers: {
      'app/**/*.js': wallaby.compilers.babel(babelConfig),
    },
    postprocessor: wallabyWebpackPostprocessor,
    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },
    debug: true
  }
};