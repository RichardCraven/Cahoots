
exports.up = function(knex, Promise) {
  return knex.schema.createTable('film_post_conversations', table => {
  	table.increments();
  	table.text('message')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('first_comment_id').unsigned().index().references('film_post_comments.id').onDelete('cascade');
  	table.integer('film_post_id').unsigned().index().references('film_posts.id').onDelete('cascade');
  	table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('film_post_conversations');
};
