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
            return  this.props.data.temp_c + "\u00b0C";
        }
        return this.props.data.temp_f + "\u00b0F";
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
            <div className="WeatherDisplay">
                {this.getIconImageTag()}
                <ul>
                    <li>
                        <span className="label">Temp: </span>
                        <span>{this.temperature()}</span>
                    </li>
                    <li>
                        <span className="label">Wind: </span>
                        <span>{this.wind()}</span>
                    </li>
                    <li>
                        <span className="label">Precipitation: </span>
                        <span>{this.precipitation()}</span>
                    </li>
                    <li>
                        <span className="label">Humidity: </span>
                        <span>{this.humidity()}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default WeatherDisplay;
