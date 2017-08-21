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

const COMMANDS = [{
    name:'whoami',
    command:'whoami'
},
{
    name:'ls',
    command:'ls',
    arguments:['la']
}
];

module.exports = (app, knex) => {
    
    const requestCommand = async (command) => {
        try {
            const actual = COMMANDS.filter(systemCommand => systemCommand.command === command)[0];
            if(!actual) 
                throw 'Bad command';

            return await commander.request(actual);

        } catch (error) {
            Promise.reject(error);
        }
    }
    return {
        '/commands':{
            get: async (req) => COMMANDS,
            
            '/:command':{
                 put: async (req) => await requestCommand(req.params.command),
            }
        }
    }
};