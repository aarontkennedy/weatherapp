import React from 'react';
import WeatherWidgetParent from './weatherWidgetParent';

class WeatherDisplay extends WeatherWidgetParent {

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
        let temp = this.isMetric() ? data.temp_c : data.temp_f;
        return this.tempString(temp);
    }

    wind = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let wind = this.isMetric() ? data.wind_mph : data.wind_kph;
        return this.windString(wind, data.wind_dir);
    }

    precipitation = () => {
        if (!this.props.data) {
            return "";
        }
        let data = this.props.data;
        let precip = this.isMetric() ? data.precip_mm : data.precip_in;
        return this.precipString(precip);
    }

    humidity = () => {
        if (!this.props.data) {
            return "";
        }
        return this.humidityString(this.props.data.humidity);
    }

    maxMinTemp = () => {
        if (!this.props.forecast) {
            return "";
        }
        let forecast = this.props.forecast;
        const isMetric = this.isMetric();
        let min = (isMetric) ? forecast.mintemp_c : forecast.mintemp_f;
        let max = (isMetric) ? forecast.maxtemp_c : forecast.maxtemp_f;
        return this.maxMinTempString(min, max);
    }

    predictedPrecipitation = () => {
        if (!this.props.data) {
            return "";
        }
        let forecast = this.props.forecast;
        let precip = this.isMetric() ? forecast.totalprecip_mm : forecast.totalprecip_in;
        return this.precipString(precip);
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

                <p className="weather-display__row">
                    <span className="weather-display__label">Forecast: </span>
                    <span className="weather-display__value">{this.maxMinTemp()}</span>
                </p>
                <p className="weather-display__row">
                    <span className="weather-display__label">Precipitation: </span>
                    <span className="weather-display__value">{this.precipitation()}</span>
                </p>
            </div>
        );
    }
}

export default WeatherDisplay;
