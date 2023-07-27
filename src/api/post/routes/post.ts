/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post'
// , {
//   config: {
//     find: {
//       policies: [{name: 'check-role', config: { userRole: "Author" }}]
//     }
//   }
// }
);
