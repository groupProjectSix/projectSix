import React, { Component } from "react";
// import firebase from "./firebase";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Main from "./Main";
import QueryWord from "./QueryWord";
import SavedBackronym from "./SavedBackronym";

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

  showButton= () => {
    this.setState({
      showBackButton: true,
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
            
            <button onClick={this.showButton}> 
              <Link to="/SavedBackronym">
                wall of literacy fame
              </Link>
            </button>
          </header>
          <Route exact path="/" render={() => { return <Main displayButtonProp={this.displayButton} lettersToBeSpreadProp={this.lettersToBeSpread} QueryWordResultsProp={this.QueryWordResults}/>}} />

          <Route exact path="/search" render={() => { return <QueryWord userInputProp={this.state.userInput} spreadLettersProp={this.state.spreadLetters} /> }} />

          <Route exact path="/SavedBackronym" component={SavedBackronym} />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
