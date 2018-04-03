import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import index from 'axios';
import EggIcon from './EggIcon';
import NoteCard from './NoteCard.js'


// api key: c17bad791422b42a39a8f8e4299b6c53

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDHisK3W0ynEStaMHBLZ-IgTp0vgjtZC7s",
  authDomain: "paige-note-taking-app.firebaseapp.com",
  databaseURL: "https://paige-note-taking-app.firebaseio.com",
  projectId: "paige-note-taking-app",
  storageBucket: "",
  messagingSenderId: "10502024250"
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
      notes: []
    };

    // bind here
    this.showSidebar = this.showSidebar.bind(this);
    this.addNote = this.addNote.bind(this);
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
        this.setState({
          timezone: res.data.timezone,
          temperature: res.data.currently.temperature,
          summary: res.data.currently.summary,
          icon: res.data.currently.icon
          
        });

        // skycons
        let icons = new Skycons({
          'color': "yellow"
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
    
    showSidebar(e) {
      e.preventDefault();
      this.sidebar.classList.toggle("show")
    }
  
    addNote(e) {
      e.preventDefault();
      const note = {
        title: this.noteTitle.value,
        text: this.noteText.value
      };
      const newNotes = Array.from(this.state.notes);
      newNotes.push(note);
      this.setState({
        notes: newNotes
      });
    }

  // everything that gets displayed on page goes here
  render() {
    return (
      <div className="wrapper">
        <nav>
          <a href="" onClick={this.showSidebar}>Add Note</a>
        </nav>
        <section className="notes">
          {this.state.notes.map((note, i)=> {
            return (
              < NoteCard note={note} key={`note-${i}`}/>
            )
          })}
        </section>
        <aside className="sidebar"ref={ref => this.sidebar = ref}>
          <form action="" onSubmit={this.addNote}>
            <h3>Add New Note</h3>
            <div className="closeBtn" onClick={this.showSidebar}>
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Title</label>
            <input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
            <label htmlFor="note-text">Text:</label>
            <textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
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
