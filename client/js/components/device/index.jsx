import React  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import tabStyle from 'react-tabs/style/react-tabs.css';
import Commands from './commands/index.jsx';
import Inkd from '../inkd.jsx';
import Table from '../table/index.jsx';

const getPayload = (payloadString) => {
    try {
        const payload = JSON.parse(payloadString);
        return payload;
    } catch (notJson) {
        console.error('payload not JSON', notJson);
    }
} 
 
class Device extends React.Component{

    componentWillMount(){

        this.state = {device:this.getDeviceFromStore(), readings:this.getReadingsFromStore()}
        this.props.store.subscribe(()=>{
            this.setState({
                device:this.getDeviceFromStore(), 
                readings:this.getReadingsFromStore()
            });
        });
    }
    setDevice(device){
        this.setState({device})
    }
    getReadingsFromStore(){
        const readings = this.props.store.getState().readings;
        const currentDeviceReadings = readings.filter(reading=>reading.device == this.props.id);

        const mappedDeviceReadings = currentDeviceReadings.map(reading =>{
            
            const payload = getPayload(reading.payload);
            const payloadObject = Object.keys(payload).reduce( (a,b)=>{
                a[b] = payload[b];
                return a;
            }, {date:reading.createdAt});

            return payloadObject;
        });
        return mappedDeviceReadings;
    }
    getDeviceFromStore(){
        const devices = this.props.store.getState().devices;
        
        if(! devices || !devices.length) return [];

        const device = devices.slice(devices.length-1, 1).filter(d=>d.id == this.props.id)[0]; //Different types...
        if(device) return device; 
        return {name:''};
    }
    render() {
        const headKeys = () => this.state.readings[0] || {};
        return (
            <div className="main-view">
            
                <h1 className="main-view-heading">{this.state.device.name}</h1>
                <Tabs>
                    <TabList>
                        <Tab>Readings <Inkd /></Tab>
                        <Tab>Commands <Inkd /></Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className="main-view-heading-sub">Readings</h2>
                        <Table head={Object.keys(headKeys())} data={this.state.readings}/>
                    </TabPanel>
                    <TabPanel>
                        <h2 className="main-view-heading-sub">Commands</h2>
                        <Commands device={this.state.device} store={this.props.store} />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
export default Device;