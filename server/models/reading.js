const R = require('ramda')

/**
 * Model
 * readings table
 */
const reading = (knex) =>{

    'use strict';
    const reading = {};
    
    /**
     * Get all readings | single
     * 
     * @param {String} [id]
     * @return {Array} readings
     */
    reading.get = async (id = null) =>{
       try {
            const result = id ? 
                await knex.select().table('readings').where('id', id) :
                await knex.select().table('readings');
            return result;
       } catch (error) {
            return error;
       }
    }

    /**
     * Get all readings | single
     * 
     * @param {String} [id]
     * @return {Array} readings
     */
    reading.getLatest = async () =>{
       try {
            const result = await knex.select().limit(100).orderBy('createdAt', 'desc').table('readings');
            console.log('Result', result);
            return result;
       } catch (error) {
            return error;
       }
    }
    
    /**
     * Create a reading
     * 
     * @param {Object} instance of a reading
     * @return {Array} knex result - length of items
     */
    reading.create = async (instance) =>{
        try {
            const result = await knex('readings').insert(instance);
            return instance;
       } catch (error) {
            return error;
       }
    },

    reading.update = async (id, instance) =>{
        try {
            const result = await knex('readings').where('id', '=', id).update(instance);
            return {id, clause:instance};
       } catch (error) {
            return error;
       }
    }

    reading.delete = async (id) =>{
        try {
            const result = id ? 
                await knex('readings').where('id', '=', id).delete() :
                await knex('readings').delete();
            return result;
       } catch (error) {
            return error;
       }
    }


    return reading;
}; 

module.exports = reading;