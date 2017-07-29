import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

  var config = { 
    apiKey: "AIzaSyAhM06t58YoOZkDSlYsb0_kJ72TL6t4N00", 
    authDomain: "simplesurvey-4a78c.firebaseapp.com", 
    databaseURL: "https://simplesurvey-4a78c.firebaseio.com", 
    projectId: "simplesurvey-4a78c", 
    storageBucket: "simplesurvey-4a78c.appspot.com", 
    messagingSenderId: "76031077207" 
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;;
    this.setState({name: name}, function(){
      console.log(this.state);
    });
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/' + this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({submitted: true}, function(){
       console.log("Questions submitted!");
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;

    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    } else if (event.target.name === "q2") {
      answers.q2 = event.target.value;
    } else if (event.target.name === "q3") {
      answers.q3 = event.target.value;
    } else if (event.target.name === "q4") {
      answers.q4 = event.target.value;
    }

    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
          <h3>Survey Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)} action="">
            <div>
              <label htmlFor="">What is your favorite OS?</label>
              <br />
              <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Widnows <br />
              <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX <br />
              <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux <br />
            </div>
            <div>
              <label htmlFor="">
                What is your favorite smartphone brand?
              </label>
              <br />
              <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung <br />
              <input type="radio" name="q2" value="Apple" onChange={this.handleQuestionChange} />Apple <br />
              <input type="radio" name="q2" value="Huawei" onChange={this.handleQuestionChange} />Huawei <br />
            </div>
            <div>
              <label htmlFor="">
                What is your favorite Javascript framework?
              </label>
              <br />
              <input type="radio" name="q3" value="React" onChange={this.handleQuestionChange} />React <br />
              <input type="radio" name="q3" value="Angular" onChange={this.handleQuestionChange} />Angular <br />
              <input type="radio" name="q3" value="Vue" onChange={this.handleQuestionChange} />Vue <br />
            </div>
            <div>
              <label htmlFor="">
                What is your favorite gaming console?
              </label>
              <br />
              <input type="radio" name="q4" value="Xbox" onChange={this.handleQuestionChange} />Xbox <br />
              <input type="radio" name="q4" value="PlayStation" onChange={this.handleQuestionChange} />PlayStation <br />
              <input type="radio" name="q4" value="Nintendo" onChange={this.handleQuestionChange} />Nintendo <br />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </span>;
    } else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)} action="">
          <input type="text" placeholder="Enter name..." ref="name"/>
        </form>
      </span>
      questions = '';
    } else if(this.state.submitted === true) {
      user = <h2>Thank You {this.state.name}</h2>
    }

    return <div className="App">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>;
  }
}

export default App;
