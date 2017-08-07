
exports.up = (knex, Promise)=> {
  return knex.schema.createTable('readings', (t)=> {
        t.increments('id').unsigned().primary();
        t.timestamp('createdAt').nullable();
        t.timestamp('updatedAt').nullable();

        t.timestamp('timestamp').notNull();

        t.string("payload", 1000);
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('readings');
};
