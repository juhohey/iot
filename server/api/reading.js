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

    const getInstance = body => {
        const device = body.device || 1;
        return {
            timestamp:toTimeStamp(body.timestamp), payload:body.payload, device
        }
    }

    return {
        '/readings':{
            get: async (req) => await model.get(),
            put: async (req) => await model.create( R.merge( getInstance(req.body), {createdAt:toTimeStamp(Date.now()) } )),
            delete: async (req) => await model.delete(),
            
            '/latest':{
                get: async (req) => await model.getLatest(),
            },
            '/:id':{
                get: async (req) => await model.get(req.params.id),
                post: async (req) => await model.update(parseInt(req.params.id), R.merge(getInstance(req.body), {updatedAt:toTimeStamp(Date.now())})),
                delete: async (req) => await model.delete(req.params.id),
            }
        }
    }
};