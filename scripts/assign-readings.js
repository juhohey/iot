const knex = require('knex');
const config = require('../knexfile').development;
const connection = knex(config);

connection.raw("INSERT INTO devices (name, ssh, createdAt) VALUES ('pi', 'pi', 1502393819392)").then(res=>{
    connection.raw('UPDATE readings SET device=1 WHERE device IS NULL')
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
}).catch(err=>console.log(err));