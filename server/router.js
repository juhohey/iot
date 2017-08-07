
const router = (app, express, knex) => {

    'use strict';
    const router = {};

    app.get('/', (req, res) => {
        res.render('index');
    });
};

module.exports = router; 