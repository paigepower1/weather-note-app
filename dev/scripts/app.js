import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
// api key: c17bad791422b42a39a8f8e4299b6c53

class App extends React.Component {
  constructor() {
    super();
    // this refers to app
    // grabbing 
    this.state = {
      timezone: "",
      temperature: "",
      summary: "",
      icons: ""
    }
  }

  // here is anything we want to happen after the component renders
  componentDidMount() {
    axios({
      url: "https://proxy.hackeryou.com",
      params: {
        reqUrl: "https://api.darksky.net/forecast/c17bad791422b42a39a8f8e4299b6c53/43.6532,-79.3832?si=temperature"
      },
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      } 
    })
    // promise
    .then((res) => {
      console.log(res)
      console.log(res.data.currently.temperature)
      console.log(res.data.currently.icon)

      this.setState ({
        timezone: res.data.timezone,
        temperature: res.data.currently.temperature,
        summary: res.data.currently.summary,
        icon: res.data.currently.icon
      });
      // skycons
      let icons = new Skycons({
        'color':"#000000"
      }),
        list = [
          "clear-day", "clear-night", "partly-cloudy-day",
          "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
          "fog"
        ],
        i;

        for (i = list.length; i--;)
          icons.set(list[i], list[i]);

        icons.play();
    });
  }

    render() {
      return (
        <div>
          <p>{this.state.timezone}</p>
          <p>{this.state.temperature}℃</p>
          <p>{this.state.summary}</p>
          <canvas id={this.state.icon} width="80" height="80"></canvas>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

// weather API:
// using axios make get request and pass URI argument
// pass results in a promise 

// Calendar:
// calendar from github

// User Input:
// beside weather API results
// user is asked for authentication
// user can input how many eggs were layed by their chickens
// return this input to user 

// store user input in firebase 
// retrun information in calendar 
// store weather information in calendar


// state for user input 
// on submit take all info and push to firebase
