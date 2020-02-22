import React, { Component } from 'react';

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

export default ForecastDisplay;
