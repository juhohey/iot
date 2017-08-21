import React from 'react';
import style from './style.scss';
import {command} from '../../../actions/commands';
import commandStatus from '../../../api/command-status';
import Inkd from '../../inkd.jsx';

class Commands extends React.Component{

    componentWillMount(){
        this.state = {
            actions:[],
            output:[],
        };
        this.props.store.subscribe(()=>this.onUpdate());
        this.onUpdate();
    }
    onClick(eventAction){
        const action = this.state.actions.filter(action => action.name === eventAction)[0];
        this.props.store.dispatch(command({action:action.command, status:commandStatus.REQUESTED}))
    } 
    onUpdate(){
        const state = this.props.store.getState();
        console.log(state)
        this.setState({actions:state.commands, output:state.output});
    }
    setActions(){

    }

    render() {

        return (
            <div className="commands">
                <div className="commands-list">
                    {this.state.actions.map( (action, i) => {
                        return <button key={i} className="commands-action button-confirm" onClick={(e)=>this.onClick(action.name)}>
                            {action.name}
                            <Inkd/>
                        </button>
                    })}
                </div>

                <div className="commands-output">
                   {this.state.output.map( (out, i) => {
                        return <span key={i} className="commands-output-line">
                            <span className="commands-output-line-command">{this.props.device.name}@{this.props.device.ip}</span>
                            <span className="commands-output-line-in">$ {out.command}</span>
                            <span className="commands-output-line-out">{out.stdout}</span>
                        </span> 
                    })}
                </div>
            </div>
        ); 
    }
}
export default Commands; 