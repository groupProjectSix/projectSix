import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Main from "./Main";
import QueryWord from "./QueryWord";
import logo from "./assets/logo.svg";
import SavedBackronym from "./SavedBackronym"; 
import Footer from "./Footer"

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
                  <div className="navLink">
                    <Link to="/projectSix">
                      Home
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="navLink">
                    <Link to="/projectSix/SavedBackronym">
                    Wall Of Literacy Fame
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>

          </header>
          <Route exact path="/projectSix" render={() => { return <Main lettersToBeSpreadProp={this.lettersToBeSpread} QueryWordResultsProp={this.QueryWordResults}/>}} />

          <Route exact path="/projectSix/search" render={() => { return <QueryWord userInputProp={this.state.userInput} spreadLettersProp={this.state.spreadLetters} /> }} />

          <Route exact path="/projectSix/SavedBackronym" render={() => { return <SavedBackronym /> }} />  
          <Route  path="*" render={() => { return <Footer />}} />
        
        </React.Fragment> 
  
      </Router>
    );
  }
}

export default App;