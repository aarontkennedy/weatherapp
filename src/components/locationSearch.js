import React, { Component } from 'react';
import $ from 'jquery';
import callWeatherApi from '../utils/weatherapi';

class LocationSearch extends Component {
    kLocationInputSelector = '#weatherLocationSearch';

    state = {
        locationName: ""
    }

    componentDidMount() {
        // Initialize ajax autocomplete:
        console.log($(this.kLocationInputSelector));
        // $(this.kLocationInputSelector).autocomplete({
        //     serviceUrl: '/autosuggest/burgers',
        //     minChars: 3,
        //     paramName: 'q',
        //     params: [{key: ''}],
        //     onSelect: (suggestion) => {
        //         console.log(suggestion);
        //         alert(suggestion);
        //         // this.handleSelectedBurger(suggestion.data,
        //         //     suggestion.value,
        //         //     suggestion.description);
        //     }
        // });
    }

    handleSelectedLocation = (id, name, description) => {
        /*console.log(id);
        console.log(name);
        console.log(description);*/
        // this.props.populateSelectedBurger(id, name, description);
    }

    handleChange = (event) => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        // console.log(event.target);
        // console.log(value);
        this.setState({
            [name]: value
        });
        // console.log(this.state.locationName);
    };

    render() {
        return (
            <div>
                <label
                    htmlFor="locationSearchAutocomplete"
                    id="locationSearchLabel">
                    Search
                    <input 
                        type="text" 
                        name="locationSearch" 
                        id={this.kLocationInputSelector}
                        onChange={this.handleChange} 
                        defaultValue={this.state.locationName} />
                </label>
            </div >);
    }
}

export default LocationSearch;