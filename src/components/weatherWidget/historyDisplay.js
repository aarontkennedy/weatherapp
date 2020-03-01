import React from 'react';
import helpers from "./utils/helpers";
import WeatherWidgetParent from './weatherWidgetParent';

class HistoryDisplay extends WeatherWidgetParent {

    low = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let avg = (this.isMetric()) ? data.avglowtemp_c : data.avglowtemp_f;
        avg = Math.round(avg);
        return this.tempString(avg);
    }

    temperature = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let avg = (this.isMetric()) ? data.avgtemp_c : data.avgtemp_f;
        avg = Math.round(avg);
        return this.tempString(avg);
    }

    high = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let avg = (this.isMetric()) ? data.avghightemp_c : data.avghightemp_f;
        avg = Math.round(avg);
        return this.tempString(avg);
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let precipitation = (this.isMetric()) ? data.precip_mm : data.precip_in;
        return this.precipString(precipitation);
    }

    render() {
        return (
            <div className="weather-display">
                <h2 className="weather-display__title">
                    Past Week
                </h2>   

                <p className="weather-display__row">
                    <span className="label">Avg Low: </span>
                    <span>{this.low()}</span>
                </p>

                <p className="weather-display__row">
                    <span className="label">Avg Temp: </span>
                    <span>{this.temperature()}</span>
                </p>

                <p className="weather-display__row">
                    <span className="label">Avg High: </span>
                    <span>{this.high()}</span>
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
