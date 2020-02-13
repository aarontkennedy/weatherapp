import React, { Component } from 'react';
import './App.css';
import callWeatherApi from './utils/weatherapi';
import LocationSearch from './components/locationSearch'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "Minneapolis",
      location: null,
      current: null,
    };
    const API_KEY =`${process.env.REACT_APP_WEATHER_API_KEY}`
    console.log(API_KEY);
  }

  componentDidMount() {
    console.log(this.state);
    callWeatherApi.getCurrent(this.state.query)
            .then((data) => {
                console.log(data.data);
                this.setState({location: data.data.location});
                this.setState({current: data.data.current});
                console.log(this.state);
            })
            .catch((e) => {
                console.log(e);
            });
            console.log(this.state);

    // callWeatherApi.getHistory(this.state.query)
    //         .then((data) => {
    //             console.log(data.data);
    //             this.setState({location: data.data.history});
    //             console.log(this.state);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
  }

  // componentWillUnmount() {
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <LocationSearch />

          <p>{ this.state.location ? this.state.location.name : ""}</p>

          <p>{ this.state.current ? this.state.current.temp_f : ""}</p>

        </header>
      </div>
    );
  }
}

export default App;
