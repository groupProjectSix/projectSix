import React, { Component } from "react";
// import firebase from "./firebase";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Main from "./Main";
import QueryWord from "./QueryWord";
import logo from "./assets/logo.svg";
import SavedBackronym from "./SavedBackronym";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      spreadLetters: [],
    };
  }

  returnHome = (event) => {
    event.preventDefault();
    this.setState({
      userInput: "",
    });
    this.setState({
      showBackButton: false,
    });
    this.setState({
      spreadLetters: [],
    });
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
          <header className="wrapper">
            <div className="logoContainer">
              <h1 className="sr-only">Backronym Generator!</h1>
              <img src={logo} />
            </div>

            <nav>
              <ul>
                <li>
                  <button className="navLink" onClick={this.returnHome}>
                    <Link to="/">
                      Home
                    </Link>
                  </button>
                </li>
                <li>
                  <button className="navLink"> 
                    <Link to="/SavedBackronym">
                    Wall Of Literacy Fame
                    </Link>
                  </button>
                </li>
              </ul>
            </nav>

          </header>
          <Route exact path="/" render={() => { return <Main lettersToBeSpreadProp={this.lettersToBeSpread} QueryWordResultsProp={this.QueryWordResults}/>}} />

          <Route exact path="/search" render={() => { return <QueryWord userInputProp={this.state.userInput} spreadLettersProp={this.state.spreadLetters} /> }} />

          <Route exact path="/SavedBackronym" render={() => { return <SavedBackronym /> }} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
