import React, { Component } from 'react';
import axios from 'axios';

class WordChoices extends Component {
  constructor(){
    super();
    this.state = {
      wordChoices: [],
      displayWord: ""
    }
  }

  callToApiSecond = (nextLetter) => {
    axios ({
      url: `https://api.datamuse.com/words`,
      method: "get",
      params: {
        sp: `${nextLetter}*`,
        max: 100
      }
    }).then((data) => {
      const newWordArray = [];
      data.data.map((wordObject) => {
        newWordArray.push(wordObject.word)
      })
      this.setState({
        wordChoices: newWordArray
      })
    }).then(() => {
      this.pickAWord();
    })
  }

  pickAWord = () => {
    const randomNum = Math.floor(Math.random() * this.state.wordChoices.length);
    const randomWord = this.state.wordChoices[randomNum];
    this.setState({
      displayWord: randomWord
    })
    console.log(this.state.displayWord)
  }

  componentDidMount(){
    this.callToApiSecond(this.props.letter)
  }

  render(){
    return (
      <div className="wordOption">
        <p>{this.state.displayWord}</p>
      </div>
    )
  }
}

export default WordChoices;