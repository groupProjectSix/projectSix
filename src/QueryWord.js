import React, { Component } from "react";
import axios from "axios";
import firebase from "./firebase"

class QueryWord extends Component {
  constructor() {
    super();
    this.state = {
      lettersToQuery: [],
      displayedWords: [],
      firstWordArray: [],
      firstSelectedWord: "",
      wordListArray: [],
      finalWord: [],
    };
  }

  handleFirebaseSubmit =() => { 
    const dbRef = firebase.database().ref(); 
    const submittedWords = (this.state.firstSelectedWord+',').concat(this.state.finalWord)
    dbRef.push({
      submittedWords: submittedWords
  }); 

}   
  generateRandomNumber = (array) => {
    return(Math.floor(Math.random() * array.length))
  }

  callToApiFirst = (userWord, firstLetter) => {
    axios({
      url:`https://api.datamuse.com/words`, 
      method: "get", 
      params:{ 
          ml:`${userWord}`,
          sp: `${firstLetter}*`
        }
      }).then((data)=>{
        const newWordArray = [];
        data.data.map((wordObject) => {
          newWordArray.push(wordObject.word)
        });
        const ongoingWordArray = [...this.state.wordListArray];
        ongoingWordArray.push(newWordArray);
        this.setState({
          wordListArray: ongoingWordArray
        });
      }).then( () => {
        let randomWordNumber = this.generateRandomNumber(this.state.wordListArray[0]);
        const firstWord = (this.state.wordListArray[0][randomWordNumber]);
        this.setState({
          firstSelectedWord: firstWord,
        });
      })
      // .then(() => {
      //   for (let i = 1; i <= this.props.spreadLettersProp.length; i++) {
      //     this.callToApiSecond(this.state.firstSelectedWord, this.props.spreadLettersProp[i]);
      //   }
      // })
  }

  callToApiSecond = (prevWord, thisLetter) => {
    axios ({
      url: `https://api.datamuse.com/words`,
      method: "get",
      params: {
        rel_bga: `${prevWord}`,
        sp: `${thisLetter}*`,
        max: 100
      }
    }).then((data) => {
      if (data.data.length !== 0) {
        const newWordArray = [];
        data.data.map((wordObject) => {
          newWordArray.push(wordObject.word)
        })
        const ongoingWordArray = [...this.state.wordListArray];
        ongoingWordArray.push(newWordArray)
        this.setState({
          wordListArray: ongoingWordArray
        });
        let finalWord = [];
        finalWord = [...this.state.finalWord];
        finalWord.push(newWordArray[this.generateRandomNumber(newWordArray)]);
        this.setState({
          finalWord: finalWord,
        })
      } else {
        this.callToApiRandomWord(thisLetter)
      }
    })
  }

  callToApiRandomWord = (letter) => {
    axios({
      url: `https://api.datamuse.com/words`,
      method: 'get',
      params: {
        sp: `${letter}*`
      }
    })
  }

  // componentDidMount() {
  //   this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  // }

  render() {
    if (this.state.firstSelectedWord = "") {
      this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0])
    } else if (this.state.finalWord.length < this.props.spreadLettersProp.length) {
      const num = this.state.finalWord.length;
      this.callToApiSecond(this.state.firstSelectedWord, this.props.spreadLettersProp[num])
    }
    return (
      <React.Fragment>
        <ul className="wordChoicesList wrapper">
        {this.props.spreadLettersProp.map((letter, index) => {
          if(index===0) {
            return(
              <li key={index}>
                <p>{this.state.firstSelectedWord}</p>
              </li>
            )}
        })}

        {this.state.finalWord.map( (word, index) => {
            return(
              <li key={index}>
                {word}
              </li>
            )
          })
        }
        </ul> 
        <button type="submit" onClick={this.handleFirebaseSubmit}>Submit your word</button>
      </React.Fragment>
    )
  }
}
export default QueryWord;

// base url https://api.datamuse.com/words

// params:
// rel_bga:
// sp:
// rel_bga would be the word we want the call to relate TO
// sp: is how we want the RESPONSE to be spelled like
