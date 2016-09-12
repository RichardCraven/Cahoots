exports.up = function(knex, Promise) {
  return knex.schema.createTable('dance', table => {
  	table.increments();
  	table.text('skill_level')
  	table.text('description')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dance');
};

