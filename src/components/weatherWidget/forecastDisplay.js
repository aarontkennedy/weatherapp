import React, { Component } from 'react';

var moment = require('moment');

class ForecastDisplay extends Component {

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
        let min = (this.props.metric) ? this.props.data.mintemp_c : this.props.data.mintemp_f;
        let max = (this.props.metric) ? this.props.data.maxtemp_c : this.props.data.maxtemp_f;
        min = Math.round(min);
        max = Math.round(max);
        let units = (this.props.metric) ? "\u00b0C" : "\u00b0F";

        return `${min} - ${max}${units}`;
    }

    wind = () => {
        if (!this.props.data) {
            return "";
        }
        let wind = (this.props.metric) ? this.props.data.maxwind_kph : this.props.data.maxwind_mph;
        let units = (this.props.metric) ? "kph" : "mph";

        return `${wind} ${units}`;
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        let precipitation = (this.props.metric) ? this.props.data.totalprecip_mm : this.props.data.totalprecip_in;
        let units = (this.props.metric) ? "mm" : "in";

        return `${precipitation} ${units}`;
    }

    humidity = () => {
        if (!this.props.data) {
            return "";
        }
        return this.props.data.avghumidity + "%";
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
