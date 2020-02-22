import React, { Component } from 'react';

class WeatherDisplay extends Component {

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
        if (this.props.metric) {
            return  Math.round(this.props.data.temp_c) + "\u00b0C";
        }
        return Math.round(this.props.data.temp_f) + "\u00b0F";
    }

    wind = () => {
        if (!this.props.data) {
            return "";
        }
        let wind = this.props.data.wind_mph + " mph";
        if (this.props.metric) {
            wind = this.props.data.wind_kph  + " kph";
        }
        let direction = this.props.data.wind_dir;
        return wind + " " + direction;
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        if (this.props.metric) {
            return this.props.data.precip_mm + " mm";
        }
        return this.props.data.precip_in + " in";
    }

    humidity = () => {
        if (!this.props.data) {
            return "";
        }
        return this.props.data.humidity + "%";
    }

    render() {
        return (
            <div className="weather-display">
                <h2 className="weather-display__title">
                    Today
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

export default WeatherDisplay;
