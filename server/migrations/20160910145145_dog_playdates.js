exports.up = function(knex, Promise) {
  return knex.schema.createTable('dog_playdates', table => {
  	table.increments();
  	table.text('suggested_location')
  	table.text('dog_description')
  	table.text('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dog_playdates');
};

