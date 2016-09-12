exports.up = function(knex, Promise) {
  return knex.schema.createTable('hiking', table => {
  	table.increments();
  	table.text('difficulty_level')
  	table.text('location')
  	table.text('description')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hiking');
};

