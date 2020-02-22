import axios from "axios";
import helpers from "./helpers";

var moment = require('moment');

// https://www.weatherapi.com/api-explorer.aspx
const baseUrl = "https://api.weatherapi.com/v1/";
// todo: import key from file that is included in gitignore
const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`
helpers.log(API_KEY);
const keyString = `key=${API_KEY}`;

export default {
    getCurrent: function (queryString) {
        helpers.assert(queryString, `getCurrent(${queryString}) bad queryString`);
        const url = `${baseUrl}current.json?${keyString}&q=${queryString}`;
        return axios.get(url);
    },
    getForecast: function (queryString, days = 1) {
        helpers.assert((days > 0 && days < 5), `getForecast(${queryString}, ${days}) bad day input`);
        helpers.assert(queryString, `getForecast(${queryString}, ${days}) bad queryString`);
        const url = `${baseUrl}forecast.json?${keyString}&q=${queryString}&days=${days}`;
        helpers.log(url);
        return axios.get(url);
    },
    getHistory: function (queryString, daysBack = 1) {
        helpers.assert((daysBack > 0 && daysBack < 7), `getHistory(${queryString}, ${daysBack}) bad day input`);
        helpers.assert(queryString, `getHistory(${queryString}, ${daysBack}) bad queryString`);
        
        const day = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
        helpers.log(day);
        
        const url = `${baseUrl}history.json?${keyString}&q=${queryString}&dt=${day}`;
        helpers.log(url);
        return axios.get(url);
    },
    // getAstronomy: function(queryString, date) {
    //     // todo - check date
    //     const url = `${baseUrl}astronomy.json?${keyString}&q=${queryString}&dt=${date}`;
    //     return axios.get(url);
    // },
    autocompleteSuggestions: function (queryString) {
        helpers.assert(queryString, `autocompleteSuggestions(${queryString}) bad queryString`);
        const url = `${baseUrl}search.json?${keyString}&q=${queryString}`;
        return axios.get(url);
    }
};