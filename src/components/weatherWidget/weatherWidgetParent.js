import { Component } from 'react';

class WeatherWidgetParent extends Component {

    isMetric = () => {
        return this.props.metric;
    }

    celcius = () => {
        return "\u00b0C";
    }

    farenheit = () => {
        return "\u00b0F";
    }

    tempUnit = () => {
        return this.isMetric() ? this.celcius() : this.farenheit();
    }

    tempString = (temp) => {
        temp = Math.round(temp);
        let units = this.tempUnit();
        return `${temp}${units}`;
    }

    maxMinTempString = (min, max) => {
        min = Math.round(min);
        max = Math.round(max);
        let units = this.tempUnit();
        return `${min} - ${max}${units}`;
    }

    windSpeedUnit = () => {
        return this.isMetric() ? "kph" : "mph";
    }

    windString = (wind, direction) => {
        wind = Math.round(wind);
        let units = this.windSpeedUnit();
        return `${wind} ${direction} ${units}`;
    }

    precipUnit = () => {
        return this.isMetric() ? "mm" : "in";
    }

    precipString = (precipitation) => {
        precipitation = precipitation.toFixed(1);
        let units = this.precipUnit();
        return `${precipitation} ${units}`;
    }

    humidityString = (humidity) => {
        humidity = Math.round(humidity);
        return `${humidity}%`;
    }
}

export default WeatherWidgetParent;
