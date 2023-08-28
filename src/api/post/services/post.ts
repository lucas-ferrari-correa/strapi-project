/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', ({ strapi }) => ({
  async findPublic(args: any) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        premium: false
      }
    };

    const publicPosts = await strapi
      .entityService
      .findMany('api::post.post', this.getFetchParams(newQuery))
  },

  async findOneIfPublic(args: any) {
    const { id, query } = args;

    const post = await strapi
      .entityService
      .findOne('api::post.post', id, this.getFetchParams(query))

    return post.premium ? null : post
  },

  async likePost(args) {
    const { postId, userId, query } = args;

    const postToLike = await strapi
      .entityService
      .findOne('api::post.post', postId, {
        populate: ['likedBy']
      })

    const updatedPost = await strapi
      .entityService
      .update('api::post.post', postId, {
        data: {
          likedBy: [
            ...postToLike.likedBy,
            userId
          ]
        },
        ...query
      })

    return updatedPost
  }
}));
