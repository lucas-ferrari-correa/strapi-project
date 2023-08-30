export async function beforeCreate({ params }) {
  const adminUserId = params.data.createdBy;

  const author = (await strapi.entityService.findMany('api::author.author', {
    filters: {
      admin_user: [adminUserId]
    }
  }))[0];

  params.data.authors.connect = [...params.data.authors.connect, author.id]
}