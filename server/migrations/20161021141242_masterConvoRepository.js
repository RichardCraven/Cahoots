
exports.up = function(knex, Promise) {
  return knex.schema.createTable('convo_repository', table => {
  	table.increments();
  	table.text('category')
  	table.text('original_comment_id')
  	table.text('message')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	// table.integer('comment_id').unsigned().index().references('film_post_comments.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('convo_repository');
};
