export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['admin::user'],
      afterCreate: async ({ result }) => {
        const { id, firstName, lastName, email, username, createdAt, updatedAt } = result;
        await strapi.service('api::author.author').create({
          data: {
            firstName,
            lastName,
            email,
            username,
            createdAt,
            updatedAt,
            admin_user: [id]
          }
        })
      },
      afterUpdate: async ({ result }) => {
        const correspondingAuthor = (await strapi.entityService.findMany("api::author.author", {
          populate: ['admin_user'],
          filters: {
            admin_user: {
              id: result.id
            }
          },
        }))[0];

        const { firstName, lastName, email, username, updatedAt } = result;
        await strapi.service('api::author.author').update(correspondingAuthor.id, {
          data: {
            firstName,
            lastName,
            email,
            username,
            updatedAt
          }
        })
      }
    })
  },
};
