import React, { Component } from "react";
// import dbRef from "./firebase";
// import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import QueryWord from "./QueryWord"

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      spreadLetters: [],
    };
  }

  saveUserInput = event => {
    this.setState({
      userInput: event.target.value,
      spreadLetters: [...event.target.value]
    });
    console.log(this.state.userInput, this.state.spreadLetters);
  }; 
  
  preventDefaultFunction= event =>{
    event.preventDefault();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <form className="saveInput">
            <label htmlFor="wordInput">Enter a Word!</label>
            <input type="text" id="wordInput" onChange={this.saveUserInput} />
            {/* setup onClick function for button */}
            
          <button onClick={this.preventDefaultFunction} type="submit">
            <Link to="/search">
            Generate Backronym!
            </Link> 
          </button>

          </form> 
          <Route exact path="/search" render={()=>{return <QueryWord userInputProp={this.state.userInput} spreadLettersProp={this.state.spreadLetters} /> }} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
