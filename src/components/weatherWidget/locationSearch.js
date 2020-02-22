import React, { Component } from 'react';
import $ from 'jquery';
import callWeatherApi from './utils/weatherapi';
import helpers from "./utils/helpers";

class LocationSearch extends Component {

    state = { locationName: "" };

    componentDidMount() {
        this.setState({ locationName: this.props.defaultValue });
        // Initialize ajax autocomplete:
        $('#locationSearch').autocomplete({
            minChars: 3,
            lookup: function (query, done) {
                callWeatherApi.autocompleteSuggestions(query)
                    .then((data) => {
                        helpers.log(data.data);
                        let suggestions = data.data.map(
                            (city) => {
                                return {
                                    "value": city.name,
                                    "data": city
                                };
                            }
                        );
                        /*
    id: 2599848
    name: "Minnesota City, Minnesota, United States of America"
    region: "Minnesota"
    country: "United States of America"
    lat: 44.09
    lon: -91.75
    url: "minnesota-city-minnesota-united-states-of-america"
                        */
                        let result = {
                            suggestions: suggestions
                        };
                        helpers.log(result);

                        done(result);
                    })
                    .catch((e) => {
                        helpers.log(e);
                    });
            },
            onSelect: (suggestion) => {
                helpers.log(suggestion);
                this.props.populateSelectedLocation(
                    suggestion.value,
                    suggestion.data);
            }
        });
    }

    handleChange = (event) => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        // helpers.log(event.target);
        // helpers.log(value);
        this.setState({
            [name]: value
        });
        // helpers.log(this.state.locationName);
    };

    render() {
        return (
            <div className="weather-display__search">
                <input
                    size="50"
                    type="text"
                    id="locationSearch"
                    placeholder="City or Zip"
                    onChange={this.handleChange}
                    defaultValue={this.props.defaultValue} />
            </div >);
    }
}

export default LocationSearch;