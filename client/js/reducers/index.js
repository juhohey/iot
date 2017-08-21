import { combineReducers } from 'redux';
import errors from './api';
import devices from './devices';
import readings from './readings';
import {commands, command, setOutput} from './commands';
import sidebarChildren from './sidebar';

export default combineReducers({
  errors,
  readings,
  devices,
  commands,
  command,
  output:setOutput,
  sidebarChildren
}); 