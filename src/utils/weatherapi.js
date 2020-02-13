import axios from "axios";

// https://www.weatherapi.com/api-explorer.aspx
const baseUrl = "https://api.weatherapi.com/v1/";
// todo: import key from file that is included in gitignore
const API_KEY =`${process.env.REACT_APP_WEATHER_API_KEY}`
console.log(API_KEY);
const key = `key=${API_KEY}`;

export default {
    getKeyParamString: () => { return key; }, 
    getCurrent: function (queryString) {
        const url = `${baseUrl}current.json?${key}&q=${queryString}`;
        return axios.get(url);
    },
    getForecast: function(queryString, days=1) {
        // todo check inputs
        const url = `${baseUrl}forecast.json?${key}&q=${queryString}&days=${days}`;
        return axios.get(url);
    },    
    getHistory: function(queryString, days=1) {
        // todo fix inputs
        const url = `${baseUrl}history.json?${key}&q=${queryString}&dt=2020-02-02`;
        return axios.get(url);
    },
    getAstronomy: function(queryString, date) {
        // todo - check date
        const url = `${baseUrl}astronomy.json?${key}&q=${queryString}&dt=${date}`;
        return axios.get(url);
    },
    autocompleteSuggestionsUrl: function() {
        const url = `${baseUrl}search.json`;
        return url;
    }
};