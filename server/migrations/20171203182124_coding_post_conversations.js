
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coding_post_conversations', table => {
  	table.increments();
  	table.text('message')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('first_comment_id').unsigned().index().references('coding_post_comments.id').onDelete('cascade');
  	table.integer('coding_post_id').unsigned().index().references('coding_posts.id').onDelete('cascade');
  	table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coding_post_conversations');
};
