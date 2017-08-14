

exports.up = function(knex, Promise) {
     return new Promise( (resolve, reject)=>{
     knex('readings').insert(jeison).then(resolve()).catch(err=>reject(err))
     })
};
exports.down = function(knex, Promise) {
   return knex('readings').insert(jeison)

};