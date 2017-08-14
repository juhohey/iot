import React  from 'react';
import {post} from '../core/http';

import styles from './login.scss';
import View from '../components/view.jsx';

const BG = 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?dpr=1&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=';
const SUCCESS = 'forwards';

const queue = fn =>{
    setTimeout(()=> {
        fn();
    }, 600);
}

class Login extends React.Component{
    componentWillMount(){
        this.state = {username:'', password:'', success:''}
    }
    onChange({value}, prop){
        const last = this.state;
        last[prop] = value;
        this.setState(last);
    }
    register(){
        post('/login', this.state)
            .then(res=>this.success())
            .catch(err=>console.error(err));
    }
    success(){
        this.setState({success:SUCCESS});
        queue( ()=>{
          this.setState({successAfter:SUCCESS});
          queue( ()=>{
              document.location = '/admin';
            });
        });
    }
    
    render() {
        return (
            <div>
                <div className="view-center"
                    style={{backgroundImage:'url('+BG+')'}}>
                    <div className="view-center-col">
                            <div className="container">
                            <h1>IoT API login</h1>

                            <div className="input-instance">
                                <label>Username</label>
                                <input value={this.state.username} type="text" onChange={({target})=>this.onChange(target, 'username')}/>
                            </div>

                            <div className="input-instance">
                                <label>Password</label>
                                <input value={this.state.password} type="password" onChange={({target})=>this.onChange(target, 'password')}/>
                            </div>

                            <div className="input-instance-action">
                                <button className="button-confirm" onClick={()=>this.register()}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'view-fill-to ' + this.state.success}>
                    <div className="view-center">
                        <h3 className="text-center">Success!<br/>redirecting...</h3>
                    </div>
                </div>
                <div className={'view-fill-to ' + this.state.successAfter}>
                    <div className="view-center"></div>
                </div>
            </div>
        );
    }
}
export default Login;