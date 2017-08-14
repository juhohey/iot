import React  from 'react';
import R from 'ramda';

import List from '../list/index.jsx'

class Devices extends React.Component{

    componentWillMount(){
        this.state = {
            devices:this.getDevicesFromStore()
        };
        this.props.store.subscribe(()=>this.setDevices(this.getDevicesFromStore()));
    }
    setDevices(devices){
        this.setState({devices});
    }
    getDevicesFromStore(){

        const devices = this.props.store.getState().devices;
        if(! devices || !devices.length) return [];

        return this.addLinksToDevices(devices.slice(0,1));
    }
    addLinksToDevices(devices){
        return devices.map(device=>{
            return R.merge(device, {link:'/admin/devices/' + device.id});
        })
    }
    render() {
        return (
            <div className="main-view">
                <h1>Devices</h1> 
                <List items={this.state.devices}/>
            </div>
        );
    }
}
export default Devices;