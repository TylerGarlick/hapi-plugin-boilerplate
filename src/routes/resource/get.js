'use strict';

export default {
  path: '/v1/resources',
  method: 'GET',
  config: {
    tags: ['api']
  },
  handler: {
    async: async(request, reply) => {
      return reply({});
    }
  }
}
