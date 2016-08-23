
exports.up = function(knex, Promise) {
  return knex.schema.createTable('music_post_comments', table => {
  	table.increments();
  	table.text('comment')
  	table.text('user_pic')
  	table.text('user_id').unsigned().index().references('users.third_party_user_id').onDelete('cascade');
  	table.integer('post_id').unsigned().index().references('music_posts.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('music_post_comments');
};
