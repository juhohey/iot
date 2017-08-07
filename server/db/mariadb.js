const R = require('ramda');
const knex = require('knex');
const config =  require('../../knexfile.js').development;

module.exports = async ()=> {

    const initialConfig = R.pickBy((val, key)=>key !== 'db', config.connection);
    const connection = knex({
        client:'mariasql',
        connection:initialConfig
    });

    try {
        await connection.raw('CREATE DATABASE iot')
    } catch (dbAlreadyCreated) {
    }
    
    return knex(config);
} 