
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
  	table.increments();
  	table.text('name')
  	table.text('display_name')
  	table.text('user_pic')
  	table.text('third_party_user_id').unique()
  	table.text('bio')
  	table.integer('zip_code')
  	table.boolean('first_time')
  	table.boolean('has_mail')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
