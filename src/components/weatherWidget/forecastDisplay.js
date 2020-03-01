import React from 'react';
import WeatherWidgetParent from './weatherWidgetParent';

var moment = require('moment');

class ForecastDisplay extends WeatherWidgetParent {

    getIcon = () => {
        if (!this.props.data || !this.props.data.condition) {
            return "";
        }
        return this.props.data.condition.icon;
    }

    getConditions = () => {
        if (!this.props.data || !this.props.data.condition) {
            return "";
        }
        return this.props.data.condition.text;
    }

    getIconImageTag = () => {
        if (!this.getIcon()) {
            return "";
        }
        return (
            <img 
            src={this.getIcon()} 
            alt={this.getConditions()}
            />
        );
    }

    temperature = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let min = (this.isMetric()) ? data.mintemp_c : data.mintemp_f;
        let max = (this.isMetric()) ? data.maxtemp_c : data.maxtemp_f;
        return this.maxMinTempString(min, max);
    }

    wind = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let wind = (this.isMetric()) ? data.maxwind_kph : data.maxwind_mph;
        return this.windString(wind, "");
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let precipitation = (this.isMetric()) ? data.totalprecip_mm : data.totalprecip_in;
        return this.precipString(precipitation);
    }

    humidity = () => {
        if (!this.props.data) {
            return "";
        }
        return this.humidityString(this.props.data.avghumidity);
    }
             
    render() {
        let date = "";
        
        if (this.props.title) {
            date = moment(this.props.title, 'YYYY-MM-DD').format("MMM Do");
        }

        return (
            <div className="weather-display">
                <h2 className="weather-display__title">
                    {date}
                </h2>  
                <p className="weather-display__icon_holder">
                    {this.getIconImageTag()}
                </p>
                <p className="weather-display__row">
                    <span className="weather-display__label">Temp: </span>
                    <span className="weather-display__value">{this.temperature()}</span>
                </p>
                <p className="weather-display__row">        
                    <span className="weather-display__label">Wind: </span>
                    <span className="weather-display__value">{this.wind()}</span>
                </p>
                <p className="weather-display__row">
                    <span className="weather-display__label">Precipitation: </span>
                    <span className="weather-display__value">{this.precipitation()}</span>
                </p>
                <p className="weather-display__row">
                    <span className="weather-display__label">Humidity: </span>
                    <span className="weather-display__value">{this.humidity()}</span>
                </p>
            </div>
        );
    }
}

export default ForecastDisplay;
