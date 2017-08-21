import React from 'react';

import LineChart from '../charts/line/index.jsx';
import style from './style.scss';
import {toJSON} from '../../core/helpers';

class Dashboard extends React.Component {

    componentWillMount(){
        
        this.state = {
            device:'',
            readingType:'',
            series:[]
        }

        this.props.store.subscribe( ()=>this.setReadings());
        this.setReadings();
    }

    formatReadings(readings){
        const series = readings.map(reading => {
            return  toJSON(reading.payload);
        });
        const readingType = series[0].temperature;
        const device = readings[0].device;
       
        return {device, readingType, series:this.getSeries(series, 'temperature')}
    }
    setReadings(){
        const readings = this.props.store.getState().readings;
        if (readings.length) {
            this.setState(this.formatReadings(readings));
                console.log('set', readings);
        }
    }
    getSeries(series, key){
        return series.map( serie=>parseFloat(serie[key]))   
    }
    render(){

        const getChart = () =>{
            return this.state.series.length ? 
                <LineChart series={this.state.series} yaxis={this.state.readingType} title={this.state.device} /> :
                '';
        }
        return(
            <div className="main-view dashboard">
                <h1>Dashboard</h1> 
                {getChart()}
            </div>
        )
    }

}

export default Dashboard;  