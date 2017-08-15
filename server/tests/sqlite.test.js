const test = require('ava');

test('Sqlite has a connection', t => {

    t.plan(1);

    return require('../db/sqlite')()
        .then(res => t.pass())
        .catch(err => t.fail());
});

