import React, { Component } from "react";
import firebase from "./firebase";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Main from "./Main";
import QueryWord from "./QueryWord";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      spreadLetters: [],
      showBackButton: false,
    };
  }

  displayButton = () => {
    this.setState({
      showBackButton: true,
    })
  }

  returnHome = (event) => {
    event.preventDefault();
    this.setState({
      userInput: "",
    })

    this.setState({
      showBackButton: false,
    })
  }

  // pull firebase data and add it to the console
  pullFirebase = () => {
    const dbRef = firebase.database().ref(); 
    dbRef.on('value', snapshot => {
      const data = snapshot.val();
      console.log(data);
    });

    this.setState({
      showBackButton: true,
    })
  }

  QueryWordResults = (wordToQuery) => {
    this.setState({
      userInput: wordToQuery,
    })
  }

  lettersToBeSpread = () => {
    this.setState({
      spreadLetters: [...this.state.userInput],
    })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <header>
            <h1>Backronym Generator!</h1>
            {this.state.showBackButton ? <button onClick={this.returnHome}>
              <Link to="/">
                Go Backronym!
              </Link>
            </button>: null}
            
            <button onClick={this.pullFirebase}> 
              <Link to="/SavedBackronym">
                wall of literacy fame
              </Link>
            </button>
          </header>
          <Route exact path="/" render={() => { return <Main displayButtonProp={this.displayButton} lettersToBeSpreadProp={this.lettersToBeSpread} QueryWordResultsProp={this.QueryWordResults}/>}} />

          <Route exact path="/search" render={() => { return <QueryWord userInputProp={this.state.userInput} spreadLettersProp={this.state.spreadLetters} /> }} />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
