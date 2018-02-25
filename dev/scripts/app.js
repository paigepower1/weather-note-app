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

      this.setState ({
        temperature: res.data.currently.temperature,
        summary: res.data.currently.summary,
        icon: res.data.currently.icon
      });
      // skycons
      // var icons = new Skycons({
      //   'color':"#000000"
      // }),
      //   list = [
      //     "clear-day", "clear-night", "partly-cloudy-day",
      //     "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      //     "fog"
      //   ],
      //   i;

      //   for (i = list.length; i--;)
      //     icons.set(list[i], list[i]);

      //   icons.play();
      var icons = new Skycons({ 
        "color": "lightblue" 
      });

      icons.set("clear-day", Skycons.CLEAR_DAY);
      icons.set("clear-night", Skycons.CLEAR_NIGHT);
      icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
      icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
      icons.set("cloudy", Skycons.CLOUDY);
      icons.set("rain", Skycons.RAIN);
      icons.set("sleet", Skycons.SLEET);
      icons.set("snow", Skycons.SNOW);
      icons.set("wind", Skycons.WIND);
      icons.set("fog", Skycons.FOG);

      icons.play();
    });
  }

    render() {
      return (
        <div>
          <p>Temperature: {this.state.temperature}</p>
          <p>Summary: {this.state.summary}</p>
          <canvas id="clear-day" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="clear-night" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="partly-cloudy-night" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="cloudy" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="rain" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="sleet" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="snow" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="wind" width="64" height="64">{this.state.icon}</canvas>
          <canvas id="fog" width="64" height="64">{this.state.icon}</canvas>
          {/* <form action="">
            <input type="text"/>
            <label htmlFor=""></label>
          </form> */}
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
