
const sqlizer = function() {

    'use strict';
    const sqlizer = {};

    sqlizer.toTimeStamp = date => new Date(parseInt(date)).toISOString().slice(0, 19).replace('T', ' ');

    return sqlizer;
};

module.exports = sqlizer();