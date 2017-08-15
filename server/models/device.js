const R = require('ramda')

/**
 * Model
 * devices table
 */
const device = (knex) =>{

    'use strict';
    const device = {};
    
    /**
     * Get all devices | single
     * 
     * @param {String} [id]
     * @return {Array} devices
     */
    device.get = async (id = null, readings = false) =>{
       try {
           if(id){
             if (readings){
                const result = await knex.select(['devices.*', 'readings.*']).table('devices').leftJoin('readings', 'readings.device', 'devices.id').where('id', id);
                return result;
             }
           }
           else{
               if (readings)
                return await knex.select('devices.*', 'readings.device').table('devices').join('readings', 'readings.device', 'devices.id');
               else
                return await knex.select().table('devices');
             
           }
           
       } catch (error) {
           console.log('device.get error', error);
            return error;
       }
    }
    
    /**
     * Create a device
     * 
     * @param {Object} instance of a device
     * @return {Array} knex result - length of items
     */
    device.create = async (instance) =>{
        try {
            const result = await knex('devices').insert(instance);
            return instance;
       } catch (error) {
            return error;
       }
    },

    device.update = async (id, instance) =>{
        try {
            const result = await knex('devices').where('id', '=', id).update(instance);
            return {id, clause:instance};
       } catch (error) {
            return error;
       }
    }

    device.delete = async (id) =>{
        try {
            const result = id ? 
                await knex('devices').where('id', '=', id).delete() :
                await knex('devices').delete();
            return result;
       } catch (error) {
            return error;
       }
    }


    return device;
}; 

module.exports = device;