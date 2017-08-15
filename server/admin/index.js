const Auth = require('../auth/auth.development.js');

const admin = (app, express, knex) => {

    'use strict';
    const admin = {};
    const auth = Auth(knex);
    
    app.get('/login', (req, res)=>{
        res.render('login');
    });

    app.post('/login', (req, res) => {

        auth.login(req, res)
            .then(success => res.send('success'))
            .catch(err => res.status(500).send({status:'error', message:JSON.stringify(err)}));

    });
    
    app.use('/admin', auth.verify);        
    app.get('/admin*', (req, res) => {
        res.render('admin');
    });


    return admin;
};

module.exports = admin;