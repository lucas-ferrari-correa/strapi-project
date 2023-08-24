/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium["$eq"] == "false";

    if (ctx.state.user || isRequestingNonPremium) {
      return await super.find(ctx);
    }

    const { query } = ctx;

    const filteredPosts = await strapi.service("api::post.post").find({
      ...query,
      filters: {
        ...query.filters,
        premium: false
      }
    });

    const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx);
    return this.transformResponse(sanitizedPosts);
  }
}));
