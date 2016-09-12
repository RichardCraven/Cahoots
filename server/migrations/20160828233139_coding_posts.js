exports.up = function(knex, Promise) {
  return knex.schema.createTable('coding_posts', table => {
  	table.increments();
  	table.text('framework')
  	table.text('description')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coding_posts');
};

