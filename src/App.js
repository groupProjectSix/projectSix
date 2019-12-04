import React, { Component } from 'react';
import dbRef from './firebase'
import './App.scss';

class App extends Component {
  constructor(){
    super();
    this.state = {
      wordArray: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="wordInput">Enter a Word!</label>
        <input type="text" id="wordInput" />
        {/* setup onClick function for button */}
        <button>Generate Backronym!</button>
      </React.Fragment>
    );
  }
}

export default App;
