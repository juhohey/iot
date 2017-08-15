
exports.up = function(knex, Promise) {
    return knex.schema.createTable('devices', (t)=> {
        t.increments('id').unsigned().primary();

        t.string('name').notNull();
        t.string('description').notNull();
        t.string('ip').notNull();
        
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('devices');
};
