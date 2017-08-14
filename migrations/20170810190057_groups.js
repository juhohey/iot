
exports.up = function(knex, Promise) {
     return new Promise( (resolve, reject)=>{
         knex.schema.createTable('groups', (t)=> {
        t.increments('id').unsigned().primary();

        t.string('name').notNull();
        t.integer('access').notNull();
        
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
     }).then(resolve()).catch(err=>reject(err))
     })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('groups');
};
