
const sqlizer = function() {

    'use strict';
    const sqlizer = {};

    sqlizer.toTimeStamp = date => new Date(parseInt(date)).toISOString();

    return sqlizer;
};

module.exports = sqlizer();