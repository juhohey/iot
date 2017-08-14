export const COMMANDS = 'COMMANDS';
export const COMMAND = 'COMMAND';
export const SET_COMMAND_OUTPUT = 'SET_COMMAND_OUTPUT';

export const setCommands = (commands) =>({type:COMMANDS, commands});
export const command = (command) =>({type:COMMAND, command});
export const setCommandOutput = (output) =>({type:SET_COMMAND_OUTPUT, output});