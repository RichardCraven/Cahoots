
exports.up = function(knex, Promise) {
  return knex.schema.createTable('film_post_comments', table => {
  	table.increments();
  	table.text('comment')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('post_id').unsigned().index().references('film_posts.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('film_post_comments');
};
