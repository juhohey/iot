import {error} from '../actions/api';
import {setDevices} from '../actions/devices';
import {setReadings} from '../actions/readings';
import {setCommands, command, setCommandOutput} from '../actions/commands';
import {get, post, put} from '../core/http';
import {REQUESTED, CANCELLED, COMPLETED} from './command-status';

const api = (store) => {

    'use strict';
    const api = {};
    const PREFIX = '/api/v1/mdskASdiuj128';
    let selfCommandState = '';

    api.sync = (route, action) => {
      get(route)
        .then(items=>store.dispatch(action(items)))
        .catch(err=>store.dispatch(error(err)))
    };

    api.sync(`${PREFIX}/devices`, setDevices);
    api.sync(`${PREFIX}/readings/latest`, setReadings);
    api.sync(`${PREFIX}/commands`, setCommands);

    const onUpdate = ()=>{
        store.subscribe( ()=>{
            const state = store.getState();
            handleCommands(state.command);
            console.log(state);
        });
    }

    const handleCommands = (userRequestedCommands) => {
        const recent = userRequestedCommands[0];
        console.log('recent', recent);
        if( recent  &&
            recent.status === REQUESTED &&
            selfCommandState !== REQUESTED) {
            selfCommandState = REQUESTED;
            put(`${PREFIX}/commands/${recent.action}`)
            .then(output=>{
                store.dispatch(setCommandOutput(output));
                store.dispatch(command({name:recent.action, status:COMPLETED}));
                selfCommandState = COMPLETED;
            })
            .catch(err=>{
                store.dispatch(error(err));
                store.dispatch(command({name:recent.action, status:CANCELLED}));
            })
        }
    }

    console.log('typeof command', typeof command);
    onUpdate();
    return api;
};

export default api;