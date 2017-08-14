
exports.up = (knex, Promise)=> {
  return knex.schema.createTable('users', (t)=> {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();

        t.string('username').notNull();
        t.string('password').notNull();

        t.dateTime('lastLogin').nullable();
        t.boolean('canLogin').notNull();

        t.integer('usergroup').unsigned();
        t.foreign('usergroup').references('id').inTable('groups');
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');

};