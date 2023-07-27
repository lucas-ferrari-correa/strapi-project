/**
 * tag router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tag.tag', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: []
    },
    findOne: {},
    create: {},
    update: {},
    delete: {}
  }
});
