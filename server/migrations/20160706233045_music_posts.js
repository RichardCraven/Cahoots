exports.up = function(knex, Promise) {
  return knex.schema.createTable('music_posts', table => {
  	table.increments();
  	table.text('genre');
  	table.text('description');
  	table.text('roles_needed')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('music_posts');
};

