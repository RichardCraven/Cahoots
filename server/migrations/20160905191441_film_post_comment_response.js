
exports.up = function(knex, Promise) {
  return knex.schema.createTable('film_post_comment_responses', table => {
  	table.increments();
  	table.boolean('original_poster')
  	table.text('response')
  	table.text('display_name')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('post_id').unsigned().index().references('film_posts.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('film_post_comment_responses');
};
