import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import index from 'axios';
import EggCounter from './EggCounter';
import EggIcon from './EggIcon';
import events from './EventCalendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// api key: c17bad791422b42a39a8f8e4299b6c53

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB7TVAtpvGhLbdNAdktABZQailxPr58R-I",
  authDomain: "chicken-app.firebaseapp.com",
  databaseURL: "https://chicken-app.firebaseio.com",
  projectId: "chicken-app",
  storageBucket: "",
  messagingSenderId: "18953960665"
};
firebase.initializeApp(config);

// main App component
// set initial state in here 
// and bind functions
class App extends React.Component {
  constructor() {
    super();
    // this refers to app
    // grabbing 
    this.state = {
      timezone: "",
      temperature: "",
      summary: "",
      icons: "",
      // array
      eggInput: "",
      eggsLaid: []
    };

    // bind here
    this.handleChange = this.handleChange.bind(this);
    this.addEgg = this.addEgg.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  // here is anything we want to happen after the component renders
  componentDidMount() {
    // const dbref = firebase.database().ref("/eggsLaid");

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
      this.setState ({
        timezone: res.data.timezone,
        temperature: res.data.currently.temperature,
        summary: res.data.currently.summary,
        icon: res.data.currently.icon
        // eggInput: ""
      });

      // skycons
      let icons = new Skycons({
        'color':"yellow"
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

    const dbrefAll = firebase.database().ref("/AllData");

    dbrefAll.on("value", (snapshot) => {
      const data = snapshot.val();
      const state = [];
      for(let key in data) {
      data[key].key = key;
      state.push(data[key]);
      }
      this.setState({
        eggsLaid: state
      })
    });
  }

  // user input
  addEgg(e) {
    e.preventDefault(); 
    const eggInput = {
      value: this.state.eggInput
    };
    
    // make new variable
    // add everything in here that I want pushed to firebase
    const AllData = {
      timezone: this.state.timezone,
      temperature: this.state.temperature,
      summary: this.state.summary,
      icons: this.state.icons,
      eggInput: this.state.eggInput
    }

    // .ref is method on firebase that makes reference to where we push data to
    // push data to firebase to eggs array here
    const dbRefAllData = firebase.database().ref("/AllData");
    dbRefAllData.push(AllData);

    this.setState({
      eggInput: ""
    });
  }

    // everything that gets displayed on page goes here
    render() {
      return (
        <div className="wrapper">
             <h2 className="timeZone">{this.state.timezone}</h2>
             <p className="weatherSummary">{this.state.summary}</p>
          <div>
             <div className="tempIconFlex">
                <canvas className="flexIcon" id={this.state.icon} width="100" height="100"></canvas>
                <p className="flexTemp">{this.state.temperature}<span className="celcius">℃</span></p>
             </div>
             <div className="icon">
                 <EggIcon />
             </div>
          </div>
            <form onSubmit={this.addEgg}>
              <input className="input" type="text" placeholder="Enter number of chicken eggs"value={this.state.eggInput} onChange={this.handleChange} id="eggInput"/>
              {/* on submit add weather and egg input to firebase */}
              <input className="submitButton" type="submit" value="Add to calendar" />
            </form>

            <div className="bigCalendar">
            <BigCalendar
              popup
              selectable
              events={events}
              onSelectEvent={event => alert(event.title)}
              views={['month', 'week', 'day']}
              // style={style}
              />
            </div>

          {/* <div>
            <EventCalendar
              month={7}
              year={2015}
              events={events}
              onEventClick={(target, eventData, day) => console.log(eventData)
                />
          </div> */}
         
         {/* this works but im not using it right now */}
         {/* uploads to firebase */}
          {/* <div>
            {this.state.eggsLaid.map((eggInput) => {
              return (
                 <EggCounter data={eggInput} key={eggInput.key} />
              )
            })}
          </div> */}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

// pseudo code

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
// return information in calendar 
// store weather information in calendar


// state for user input 
// on submit take all info and push to firebase
