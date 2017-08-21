import React from 'react';
import Highcharts from 'highcharts';

import {getID} from '../../../core/helpers';
import style from './style.scss';

const getLine = props =>{

   return {

        title: {
            text: `Readings from ${props.device}`,
            align: 'left',
        },
        yAxis: {
            title: {
                text: `${props.reading}`
            },
            min: 0
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                pointStart: 0
            }
        },
        credits: {
            enabled: false
        },
        series: props.series
    }
}

class LineChart extends React.Component{

    componentWillMount(){
        this.id = getID();
    }
    componentDidMount(){
        
        this.chart = Highcharts.chart(this.id, getLine({
            device:'pi',
            reading:'deg C',
            series:[{name:'Temperature', data: this.props.series}]
        }));
    }
    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (
            <div className="chart chart-line">
                <div id={this.id} />
            </div>
        );
    }
}
export default LineChart;
