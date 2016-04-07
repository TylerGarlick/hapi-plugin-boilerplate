'use strict';

const plugin = (server, options, next) => {

  return next();
};

plugin.attributes = { pkg: require('../package.json') };

export default plugin;



