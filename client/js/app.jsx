import React  from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {queue} from './core/helpers';
import style from './app.scss';
import api from './api';

import FillTo from './components/fill-to.jsx';
import Header from './components/header/index.jsx';
import Sidebar from './components/sidebar/index.jsx';
import Main from './components/main/index.jsx';
import View from './components/view.jsx';
import Dashboard from './components/dashboard/index.jsx';
import Devices from './components/devices/index.jsx';
import Device from './components/device/index.jsx';
import User from './components/user/index.jsx';

import {createStore} from 'redux';
import reducers from './reducers';
const store = createStore(reducers);
api(store);

const loadState = {initial:'initial', loading:'backwards', loaded:''};

class App extends React.Component{
    componentWillMount(){
        this.state={loadState:loadState.initial}
    }
    componentDidMount(){
        queue(()=>{
            this.setState({loadState:loadState.loading});
            queue(()=>this.setState({loadState:loadState.loaded}),100)
        }, 200)
    }
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <FillTo className={this.state.loadState}/>
                    <Header/>
                    <View>
                        <Main>
                            <Route exact path="/admin" component={()=><Dashboard store={store}/>}/>
                            <Route exact path="/admin/devices" component={()=><Devices store={store}/>}/>
                            <Route path="/admin/devices/:id" component={(props)=><Device id={props.match.params.id} store={store} />}/>
                            <Route path="/user" component={User}/>
                        </Main>
                    </View>
                </div>
            </BrowserRouter>
        )
    }
}
export default App;  