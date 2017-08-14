const R = require('ramda');
const commander = require('../admin/commander');
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

const COMMANDS = [{name:'whoami', command:'whoami'}];

module.exports = (app, knex) => {
    
    const requestCommand = async (command) => {
        try {
            const actual = COMMANDS.filter(systemCommand => command)[0];
            if(!actual) 
                throw 'Bad command';

            return await commander.request(actual.command);

        } catch (error) {
            Promise.reject(error);
        }
    }
    return {
        '/commands':{
            get: async (req) => COMMANDS,
           // put: async (req) => await model.create( R.merge( getInstance(req.body), {createdAt:toTimeStamp(Date.now()) } )),
            //delete: async (req) => await model.delete(),
            
            '/:command':{
                 put: async (req) => await requestCommand(req.params.command),
            //    // post: async (req) => await model.update(parseInt(req.params.id), R.merge(getInstance(req.body), {updatedAt:toTimeStamp(Date.now())})),
            //     delete: async (req) => await model.delete(req.params.id),
            }
        }
    }
};