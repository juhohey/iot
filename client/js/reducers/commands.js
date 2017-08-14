import {COMMANDS, COMMAND, SET_COMMAND_OUTPUT} from '../actions/commands';

export const commands = (store = [], action) => {
  switch (action.type) {
    case COMMANDS:
      return store.concat(action.commands);
    default:
      return store;
  }
}

export const command = (store = [], action) => { 
  switch (action.type) {
    case COMMAND:
      return store.concat(action.command);
    default:
      return store;
  }
}

export const setOutput = (store = [], action) => {
  switch (action.type) {
    case SET_COMMAND_OUTPUT:
      return store.concat(action.output);
    default:
      return store;
  }
}