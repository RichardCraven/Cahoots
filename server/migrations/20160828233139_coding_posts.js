exports.up = function(knex, Promise) {
  return knex.schema.createTable('coding_posts', table => {
  	table.increments();
  	table.text('scripting_language')
  	table.text('description')
  	table.text('user_pic')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coding_posts');
};

