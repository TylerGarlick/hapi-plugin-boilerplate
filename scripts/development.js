'use strict';

const Glue = require('glue');
const Path = require('path');
const _ = require('lodash');
const pkg = require('../package.json');
const port = process.env.PORT || 4000;

const ROOT_PATH = Path.resolve(__dirname, '../');

const manifest = {
  connections: [{
    port: port,
    labels: ['api']
  }],
  server: {
    load: {
      sampleInterval: 1000
    }
  },
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          opsInterval: 5000,
          requestHeaders: true,
          reporters: [{
            reporter: 'good-console',
            events: { response: '*', log: '*', error: '*' }
          }]
        }
      }
    },
    {
      plugin: 'blipp'
    },
    {
      plugin: 'inert'
    },
    {
      plugin: 'vision'
    },
    {
      plugin: 'hapi-async-handler'
    },
    {
      plugin: {
        register: 'hapi-swaggered',
        options: {
          tagging: {
            pathLevel: 2
          },
          info: {
            title: _.startCase(pkg.name),
            description: pkg.description,
            version: pkg.version
          }
        }
      }

    },

    {
      plugin: {
        register: 'hapi-swaggered-ui',
        options: {
          title: _.startCase(pkg.name),
          authorization: {
            field: 'apiKey',
            scope: 'query',
            placeholder: 'Enter your apiKey here...'
          },
          swaggerOptions: {
            docExpansion: 'list'
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-router',
        options: {
          routes: 'build/**/routes/**/*',
          cwd: ROOT_PATH
        }
      }
    },
    {
      plugin: './build'
    }
  ]
};

const options = {
  relativeTo: ROOT_PATH
};

Glue.compose(manifest, options, (err, server) => {

  if (err) {
    throw err;
  }
  server.start();
});
