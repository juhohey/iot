const readModuleFile = require('./helpers/read-module-file');
const {isJS} = require('./helpers/file-types');

/**
 * Load API modules & attach routes to app 
 * loaded files are in ./api and are called with app, knex
 * All routes recieve req as a param and expect a promise
 * 
 * @param {Object} app
 * @param {Object} knex
 */ 
const api = (app, knex) => {

    'use strict';
    const api = {};
    const API_PREFIX = '/api/v1/mdskASdiuj128';

    const apiContexts = readModuleFile
      .require([__dirname, '/api'], isJS)
      .map(fileModule => fileModule.module(app, knex));
    
    /**
     * Attach a route callback
     * TODO auth
     * 
     * @param {String} method
     * @param {String} route
     * @param {Function} callback
     */
    const attachCallback = (method, route, callback) => {
        app[method](route, (req, res) => {
            callback(req)
            .then(result=>res.json(result))
            .catch(err=>res.status(500).send(err.message)); //Debug
        });
    } 

    /**
     * Get a route context where keys can be functions or strings
     * 
     * @param {String} route
     * @param {Object} [context]
     * @return {Object} where the route key is the attached route
     */
    const getContex = (route, context) => {

        if(context) return Object.keys(context).map(methodOrRoute=>{ //metodORoute = get: ()=> || '/foobar'

            if(typeof context[methodOrRoute] === 'function') { 

                attachCallback(methodOrRoute, route, context[methodOrRoute]);
                return {route:methodOrRoute};
            }

            else return getContex(route + methodOrRoute, context[methodOrRoute]);
        })
    }

    /**
     * List of routes added 
     */
    const apiRoutes = apiContexts.map(apiContext => {

        return Object.keys(apiContext).map(route => { //route = '/foo'
            return getContex(API_PREFIX + route, apiContext[route]);
        });
    });

    return api;
};

module.exports = api;
