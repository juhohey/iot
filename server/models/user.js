const R = require('ramda')

/**
 * Model
 * users table
 */
const user = (knex) =>{

    'use strict';
    const user = {};
    
    /**
     * Get all users | single
     * 
     * @param {String} [username]
     * @return {Array} users
     */
    user.get = async (username = null) =>{
       try {
            const result = username ? 
                await knex.select().table('users').where('username', username) :
                await knex.select().table('users');
            return result;
       } catch (error) {
            return error;
       }
    }
    user.getOne = (username = null) => {
        const userInstance = user.get(username);
        return userInstance;
    }
    user.canLogin = instance =>instance.canLogin;

    return user;
}; 

module.exports = user;