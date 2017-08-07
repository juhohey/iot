const router = require('./router');
const api = require('./api');

const readModuleFile = require('./helpers/read-module-file');
const fileTypes = require('./helpers/file-types');
const db = require('./db/mariadb');

/**
 * Server instance
 * Loads the db, ./boostrap, router & api
 * 
 * @param {Object} app
 * @param {Object} express
 * @return {Object} server 
 */
const server = (app, express) =>{
  'use strict';

  const server = {};

  const setEnv = env=> process.env.NODE_ENV = env;

  const bootstrap = (params)=> {
     readModuleFile
      .require([__dirname, '/bootstrap'], fileTypes.isJS)
      .map(fileModule=>fileModule.module(app, express));
  }

  db()
    .then((connection)=>{
      const knex = connection;
      setEnv('development'); //process.ENV
      bootstrap(); //Autoload modules
      router(app, express, knex);
      api(app, knex); //Autoload API
    })
    .catch(err=>console.log(JSON.stringify(err)))
  
  return server;
};

module.exports = server;
