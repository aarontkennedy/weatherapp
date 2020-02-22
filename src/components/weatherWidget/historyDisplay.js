import React, { Component } from 'react';
import helpers from "./utils/helpers";

class HistoryDisplay extends Component {

    temperature = () => {
        if (!this.props.data) {
            return "";
        }
        helpers.log(this.props.data);
        let avg = (this.props.metric) ? this.props.data.avgtemp_c : this.props.data.avgtemp_f;
        avg = Math.round(avg);
        let units = (this.props.metric) ? "\u00b0C" : "\u00b0F";

        return `${avg}${units}`;
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        helpers.log(this.props.data);
        let precipitation = (this.props.metric) ? this.props.data.precip_mm : this.props.data.precip_in;
        precipitation = (Math.round(precipitation * 10) / 10).toFixed(2);
        let units = (this.props.metric) ? "mm" : "in";

        return `${precipitation} ${units}`;
    }

    render() {
        return (
            <div className="weather-display">
                <h2 className="weather-display__title">
                    Last Week
                </h2>   
                <p className="weather-display__row">
                    <span className="label">Avg Temp: </span>
                    <span>{this.temperature()}</span>
                </p>
                <p className="weather-display__row">
                    <span className="weather-display__label">Precipitation: </span>
                    <span className="weather-display__value">{this.precipitation()}</span>
                </p>
            </div>
        );
    }
}

export default HistoryDisplay;
