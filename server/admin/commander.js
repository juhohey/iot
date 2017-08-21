const spawn = require('cross-spawn');

const commander = () => {

    'use strict';
    const commander = {};

    commander.request = async ( {command, commandArguments = []}) => {
        const exec = spawn.sync(command, commandArguments, { stdio: 'pipe' }); 
        return {
            command,
            stderr:exec.stderr.toString(),
            stdout:exec.stdout.toString()
        };
    };

    return commander;
};

module.exports = commander();