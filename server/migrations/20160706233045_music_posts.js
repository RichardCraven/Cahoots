exports.up = function(knex, Promise) {
  return knex.schema.createTable('music_posts', table => {
		table.increments();
		table.text('descriptive_title');
  	table.text('genre');
  	table.text('summary');
		table.text('user_id');
		table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('music_posts');
};

