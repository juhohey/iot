const knex = require('knex');
const config =  require('../../knexfile.js').development;

module.exports = ()=> {
    return new Promise((resolve, reject) => {
        console.log('Connect');
        try {
            const connection = knex(config);
            resolve(connection);
        } catch (error) {
            reject(error);
        }
        
    });
} 