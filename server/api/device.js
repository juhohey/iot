const R = require('ramda');
const {toTimeStamp} = require('../helpers/sqlizer');

/**
 * Returns a route object where keys can be async route callbacks or nested routes
 * The top level must be one route or more
 * 
 * @param {Object} app
 * @param {Object} knex
 * @return {Object}
 * @example {
 *  '/reading':{
 *      get: async (req)=>reading.get();
 *  }
 * }
 */
module.exports = (app, knex) =>{
    
    const schema = require('../models/device');
    const model = schema(knex);

    return {
        '/devices':{
            get: async (req) => await model.get(),
           // put: async (req) => await model.create( R.merge( getInstance(req.body), {createdAt:toTimeStamp(Date.now()) } )),
            delete: async (req) => await model.delete(),
            
            '/:id':{
                get: async (req) => await model.get(req.params.id),
               // post: async (req) => await model.update(parseInt(req.params.id), R.merge(getInstance(req.body), {updatedAt:toTimeStamp(Date.now())})),
                delete: async (req) => await model.delete(req.params.id),
            }

        }
    }
};