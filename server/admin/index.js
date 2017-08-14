const Auth = require('../auth/auth.development.js');

const admin = (app, express, knex) => {

    'use strict';
    const admin = {};
    const auth = Auth(knex);
    
    app.use('/admin', auth.verify);        
    app.get('/admin*', (req,res)=>{
        res.render('admin');
    });


    return admin;
};

module.exports = admin;