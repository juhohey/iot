
exports.up = function(knex, Promise) {
      knex.schema.table('readings', (t)=> {

        t.integer('device').unsigned();
        t.foreign('device').references('id').inTable('devices');
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('readings');
};
