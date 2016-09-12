exports.up = function(knex, Promise) {
  return knex.schema.createTable('festival_things', table => {
  	table.increments();
  	table.text('skill_level')
  	table.text('description')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('festival_things');
};

