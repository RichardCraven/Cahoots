
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
  	table.increments();
  	table.text('name');
  	table.text('location');
  	table.text('bio');
  	table.text('image_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};

