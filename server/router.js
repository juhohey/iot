const Auth = require('./auth/auth.development.js');
const admin = require('./admin');

const router = (app, express, knex) => {

    const auth = Auth(knex);

    'use strict';
    const router = {};

    app.get('/login', (req,res)=>{
        res.render('login');
    });

    app.post('/login', (req, res) => {

        auth.login(req, res)
            .then(success=>{
                console.log('auth returned a non error', success);
                res.send('success')
            })
            .catch(err=>{
                console.log('ERR', err);
                res.status(500).send({status:'error', message:JSON.stringify(err)})
            });

    });

    admin(app, express, knex);
};

module.exports = router; 