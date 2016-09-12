exports.up = function(knex, Promise) {
  return knex.schema.createTable('film_posts', table => {
  	table.increments();
  	table.text('topic');
  	table.text('brief_description');
  	table.integer('estimated_runtime');
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('film_posts');
};

