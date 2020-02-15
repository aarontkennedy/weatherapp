import React, { Component } from 'react';
import callWeatherApi from './utils/weatherapi';
import LocationSearch from './locationSearch';
import helpers from "./utils/helpers";
import WeatherDisplay from "./weatherDisplay";
import ForecastDisplay from "./forecastDisplay";

class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            query: "Minneapolis",
            location: null,
            current: null,
            tomorrow: null,
        };
    }

    componentDidMount() {
        this.populateLocationInformation();
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
    }

    render() {
        return (
            <div className="WeatherWidget">

                <LocationSearch
                    defaultValue={this.state.query}
                    populateSelectedLocation={this.populateSelectedLocation}
                />

                <p>{this.state.query ? this.state.query : ""}</p>

                <WeatherDisplay
                    metric = {false}
                    data={this.state.current}
                />
                <ForecastDisplay
                    metric = {false}
                    data={this.state.tomorrow}
                />

                <p></p>
                Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>

            </div>
        );
    }
}

export default WeatherWidget;
