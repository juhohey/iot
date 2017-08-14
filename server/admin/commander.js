
const commander = function() {

    'use strict';
    const commander = {};

    commander.request = async (command) => {
        return {std:'Success', command};
    };

    return commander;
};

module.exports = commander();