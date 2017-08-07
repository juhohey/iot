
exports.up = (knex, Promise)=> {
  return knex.schema.createTable('readings', (t)=> {
        t.increments('id').unsigned().primary();
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').nullable();
        t.timestamp('deletedAt').nullable();

        t.timestamp('timestamp').notNull();

        t.string("payload", 1000)
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');
};
