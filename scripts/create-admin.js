const knex = require('knex');
const config = require('../knexfile').development;
const connection = knex(config);
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('admin', salt);

const query = {
    groups: "INSERT INTO groups (name, access, createdAt) VALUES ('admin', 1, 1502393819392);",
    user: `INSERT INTO users (username, password, createdAt, canLogin, usergroup) VALUES(\'admin\', \'${hash}\', 1502393819392, 1, 1);`
};
connection.raw(query.groups)
    .then(createdGroup => {
        connection.raw(query.user)
            .then(createdUser => console.log(`groups: ${createdGroup}, user: ${createdUser}`)).catch(err=>console.log('Err::createdUser', err))
    }).catch(err=>console.log('Err::createdGroup', err))
// console.log(config);