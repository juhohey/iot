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
    
    const schema = require('../models/reading');
    const model = schema(knex);

    const getInstance = body =>({
        timestamp:toTimeStamp(body.timestamp), payload:body.payload
    })

    return {
        '/readings':{
            get: async (req) => await model.get(),
            put: async (req) => await model.create(getInstance(req.body)),
            delete: async (req) => await model.delete(),
            
            '/:id':{
                get: async (req) => await model.get(req.params.id),
                post: async (req) => await model.update(parseInt(req.params.id), getInstance(req.body)),
                delete: async (req) => await model.delete(req.params.id),
            }
        }
    }
};