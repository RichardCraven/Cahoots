
exports.up = function(knex, Promise) {
  return knex.schema.createTable('convo_repository', table => {
  	table.increments();
  	table.text('category')
  	table.text('')
  	table.text('responses')
  	table.text('display_name')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('comment_id').unsigned().index().references('film_post_comments.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('film_post_comment_responses');
};
