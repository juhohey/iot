const Auth = require('./auth/auth.development.js');
const admin = require('./admin');

const router = (app, express, knex) => {

    const auth = Auth(knex);

    'use strict';
    const router = {};

    admin(app, express, knex);
};

module.exports = router; 