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

    const publicPosts = await strapi
      .service('api::post.post')
      .findPublic(ctx.query);

    const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx);
    return this.transformResponse(sanitizedPosts);
  },

  async findOne(ctx) {
    if (ctx.state.user) {
      return await super.findOne(ctx);  
    }
    
    const { id } = ctx.params;
    const { query } = ctx;

    const postIfPublic = await strapi
      .service('api::post.post')
      .findOneIfPublic({
        id, query
      })

    const sanitizeEnitity = this.sanitizeOutput(postIfPublic, ctx);
    return this.transformResponse(sanitizeEnitity)
  },

  async likePost(ctx) {
    if (!ctx.state.user) {
      return ctx.forbidden('Only authenticated users can post')
    }

    const user = ctx.state.user;
    const postId = ctx.params.id;
    const { query } = ctx;

    const updatedPost = await strapi
      .service('api::post.post')
      .likePost({
        postId,
        userId: user.id,
        query,
      })

    const sanitizeEnitity = this.sanitizeOutput(updatedPost, ctx);
    return this.transformResponse(sanitizeEnitity)
  }
}));
