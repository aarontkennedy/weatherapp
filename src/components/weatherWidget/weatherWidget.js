import React, { Component } from 'react';
import callWeatherApi from './utils/weatherapi';
import LocationSearch from './locationSearch';
import helpers from "./utils/helpers";
import WeatherDisplay from "./weatherDisplay";
import ForecastDisplay from "./forecastDisplay";
import HistoryDisplay from "./historyDisplay";
import WonderStormTitle from "./wonderStormTitle";

class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            metric: false,
            query: "Minneapolis",
            location: null,
            current: null,
            tomorrow: null,
            twoDaysOut: null,
            threeDaysOut: null,
            tomorrowData: null,
            twoDaysOutData: null,
            threeDaysOutData: null,
            history: null
        };
    }

    componentDidMount() {
        this.populateLocationInformation();
    }

    toggleMetric = () => {
        let nextState = !this.state.metric;
        this.setState({ metric: nextState});
    }

    /**
     * callback given to the locationSearch
     */
    populateSelectedLocation = (cityName, cityData) => {
        helpers.log(`populateSelectedLocation ${cityName}`);
        helpers.log(cityData);
        this.setState({
            query: cityName,
            location: cityData
        });
        helpers.log(this.state);
        this.populateLocationInformation();
    }

    /**
     * on location change, we use this to update the
     * weather information
     */
    populateLocationInformation = () => {
        helpers.log(`populateSelectedLocation ${this.state.query}`);

        callWeatherApi.getForecast(this.state.query, 4)
            .then((data) => {
                helpers.log(data.data);
                this.setState({ 
                    current: data.data.current,
                    todaysForecast: data.data.forecast.forecastday[0].day,
                    tomorrow: data.data.forecast.forecastday[1].date,
                    twoDaysOut: data.data.forecast.forecastday[2].date,
                    threeDaysOut: data.data.forecast.forecastday[3].date,
                    tomorrowData: data.data.forecast.forecastday[1].day,
                    twoDaysOutData: data.data.forecast.forecastday[2].day,
                    threeDaysOutData: data.data.forecast.forecastday[3].day,
                });
                helpers.log(this.state);
            })
            .catch((e) => {
                helpers.log(e);
            });

        this.populateHistory();
    }

    populateHistory = () => {
        let precipSumInches = 0;
        let precipSumMillimeters = 0;
        let avgTempSumFarenheit = 0;
        let avgTempSumCelcius = 0;
        let avgLowTempSumFarenheit = 0;
        let avgLowTempSumCelcius = 0;
        let avgHighTempSumFarenheit = 0;
        let avgHighTempSumCelcius = 0;

        const numDaysBack = 6;
        
        callWeatherApi.getHistory(this.state.query, 1)                
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;
            return callWeatherApi.getHistory(this.state.query, 2) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;
            return callWeatherApi.getHistory(this.state.query, 3) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;
            return callWeatherApi.getHistory(this.state.query, 4) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;
            return callWeatherApi.getHistory(this.state.query, 5) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;
            return callWeatherApi.getHistory(this.state.query, 6) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            avgLowTempSumFarenheit += dayData.mintemp_f;
            avgLowTempSumCelcius += dayData.mintemp_c;
            avgHighTempSumFarenheit += dayData.maxtemp_f;
            avgHighTempSumCelcius += dayData.maxtemp_c;

            this.setState({
                history: {
                    precip_in: precipSumInches,
                    precip_mm: precipSumMillimeters,
                    avgtemp_f: avgTempSumFarenheit/numDaysBack,
                    avgtemp_c: avgTempSumCelcius/numDaysBack,
                    avglowtemp_f: avgLowTempSumFarenheit/numDaysBack,
                    avglowtemp_c: avgLowTempSumCelcius/numDaysBack,
                    avghightemp_f: avgHighTempSumFarenheit/numDaysBack,
                    avghightemp_c: avgHighTempSumCelcius/numDaysBack
                }
            });
            helpers.log(this.state);
        })
        .catch((e) => {
            helpers.log(e);
        });
    }

    render() {
        return (
            <div className="weather-widget">
                <header>
                    <WonderStormTitle />
                </header>

                <LocationSearch
                    defaultValue={this.state.query}
                    populateSelectedLocation={this.populateSelectedLocation}
                />

                <WeatherDisplay
                    metric = {this.state.metric}
                    data={this.state.current}
                    forecast={this.state.todaysForecast}
                />
                <ForecastDisplay
                    title = {this.state.tomorrow}
                    metric = {this.state.metric}
                    data={this.state.tomorrowData}
                />
                <ForecastDisplay
                    title = {this.state.twoDaysOut}
                    metric = {this.state.metric}
                    data={this.state.twoDaysOutData}
                />
                <ForecastDisplay
                    title = {this.state.threeDaysOut}
                    metric = {this.state.metric}
                    data={this.state.threeDaysOutData}
                />
                <HistoryDisplay
                    metric = {this.state.metric}
                    data={this.state.history}
                />

                <footer>
                    <button
                        onClick={this.toggleMetric}
                    >{"\u00b0C"}/{"\u00b0F"}</button> 

                    Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
                </footer> 
            </div>
        );
    }
}

export default WeatherWidget;
