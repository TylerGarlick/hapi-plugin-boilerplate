'use strict';

module.exports = (wallaby) => {
  return {
    files: [
      'src/**/*',
      'test/**/*',
      'package.json',
      { pattern: 'test/**/*.tests.js', ignore: true }
    ],
    tests: [
      'test/**/*.tests.js'
    ],
    env: {
      type: 'node',
      // env: {
      //   params: 'DEBUG=*;'
      // }
    },
    bootstrap: () => require('./test/helper'),
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  }
};
