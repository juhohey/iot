const knex = require('knex');
const config = require('../knexfile').development;
const connection = knex(config);

connection.raw("INSERT INTO devices (name, ip, description, createdAt) VALUES ('pi', '127.0.0.1', 'OrangePi reading temperature, air pressure & humidity', 1502393819392)").then(res=>{
    connection.raw('UPDATE readings SET device=1 WHERE device IS NULL')
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
}).catch(err=>console.log(err));