import React, { Component } from 'react';
import callWeatherApi from './utils/weatherapi';
import LocationSearch from './locationSearch';
import helpers from "./utils/helpers";
import WeatherDisplay from "./weatherDisplay";
import ForecastDisplay from "./forecastDisplay";
import HistoryDisplay from "./historyDisplay";

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

        // not necessary, forecast also returns current
        // callWeatherApi.getCurrent(this.state.query)
        //     .then((data) => {
        //         this.setState({ current: data.data.current });
        //         helpers.log(this.state);
        //     })
        //     .catch((e) => {
        //         helpers.log(e);
        //     });

        callWeatherApi.getForecast(this.state.query)
                .then((data) => {
                    helpers.log(data.data);
                    this.setState({ 
                        current: data.data.current,
                        tomorrow: data.data.forecast.forecastday[0].day,
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
        const numDaysBack = 6;
        
        callWeatherApi.getHistory(this.state.query, 1)                
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            return callWeatherApi.getHistory(this.state.query, 2) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            return callWeatherApi.getHistory(this.state.query, 3) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            return callWeatherApi.getHistory(this.state.query, 4) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            return callWeatherApi.getHistory(this.state.query, 5) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;
            return callWeatherApi.getHistory(this.state.query, 6) 
        })
        .then((data) => {
            const dayData = data.data.forecast.forecastday[0].day;
            helpers.log(dayData);
            precipSumInches += dayData.totalprecip_in;
            precipSumMillimeters += dayData.totalprecip_mm;
            avgTempSumFarenheit += dayData.avgtemp_f;
            avgTempSumCelcius += dayData.avgtemp_c;

            this.setState({
                history: {
                    precip_in: precipSumInches/numDaysBack,
                    precip_mm: precipSumMillimeters/numDaysBack,
                    avgtemp_f: avgTempSumFarenheit/numDaysBack,
                    avgtemp_c: avgTempSumCelcius/numDaysBack
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
            <div className="WeatherWidget">

                <LocationSearch
                    defaultValue={this.state.query}
                    populateSelectedLocation={this.populateSelectedLocation}
                />

                <p>{this.state.query ? this.state.query : ""}</p>

                <HistoryDisplay
                    metric = {this.state.metric}
                    data={this.state.history}
                />
                <WeatherDisplay
                    metric = {this.state.metric}
                    data={this.state.current}
                />
                <ForecastDisplay
                    metric = {this.state.metric}
                    data={this.state.tomorrow}
                />

                <button
                    onClick={this.toggleMetric}
                >{"\u00b0C"}/{"\u00b0F"}</button>
                <p></p>
                Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>

            </div>
        );
    }
}

export default WeatherWidget;
