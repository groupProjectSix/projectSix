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
      restOfWordsArray: [],
      finalWord: [],
    };
  }

  handleFirebaseSubmit =() => { 
    const dbRef = firebase.database().ref(); 
    const submittedWords = (this.state.firstSelectedWord).concat(" " + this.state.finalWord);
    dbRef.push(submittedWords);
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
          sp: `${firstLetter}*`,
          md: "p"
        }
      }).then((data)=>{
        console.log(data)
        const arrayOfLetterObject = data.data;
        this.setState({
          firstWordArray: arrayOfLetterObject,
        })
      }).then( () => {
        let randomWordNumber = this.generateRandomNumber(this.state.firstWordArray);
        const firstWord = (this.state.firstWordArray[randomWordNumber].word);
        this.setState({
          firstSelectedWord: firstWord,
        });
      }).then(() => {
        for (let i = 1; i <= this.props.spreadLettersProp.length - 1; i++) {
          if (i === this.props.spreadLettersProp.length - 1) {
            this.callToApiSecond(this.props.spreadLettersProp[i], true);
          } else {
            this.callToApiSecond(this.props.spreadLettersProp[i], false);
          }
        }
      })
  }

  callToApiSecond = (nextLetter, isItWordFinal) => {
      axios ({
        url: `https://api.datamuse.com/words`,
        method: "get",
        params: {
          // lc: `${this.state.firstSelectedWord}`,
          sp: `${nextLetter}*`,
          max: 100,
          md: "p"
        }
      }).then((data) => {
        console.log(data);
        const newWordArray = [];
        data.data.map((wordObject) => {
          newWordArray.push(wordObject)
        })
        const ongoingWordArray = [...this.state.restOfWordsArray];
        ongoingWordArray.push(newWordArray)
        this.setState({
          restOfWordsArray: ongoingWordArray
        });
        let finalWord = [];
        let isItANoun = false;
        let actualStringToPush = "";
        let fillerWord = "";
        finalWord = [...this.state.finalWord];
        const wordToPush = newWordArray[this.generateRandomNumber(newWordArray)]
        if (isItWordFinal) { //check if it's word final letter BECAUSE
          finalWord.push(newWordArray[this.generateRandomNumber(newWordArray)].word)
        } else {
          for (let i = 0; i <= wordToPush.tags.length; i++) {
            if (wordToPush.tags[i] === "n") {
              isItANoun = true;
            }
          }
          if (isItANoun) {
            actualStringToPush = `${wordToPush.word} of`
          } else {
            actualStringToPush = `${wordToPush.word}`
          }
          finalWord.push(actualStringToPush)
        }
        this.setState({
          finalWord: finalWord,
        });          
      })
      // words that often follow "drink" in a sentence, that start with the letter w 	/words?lc=drink&sp=w*
    }

  componentDidMount() {
    this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  render() {
    return (
      <React.Fragment>
        <ul className="wordChoicesList wrapper">
        {this.props.spreadLettersProp.map( (letter, index) => {
          if (index === 0) {
            return(
              <li key={index}>
                <p>{this.state.firstSelectedWord}</p>
              </li>
            )
          } else {
            this.state.restOfWordsArray.map((wordArray, index) => {
              return (
                <li key={index}>
                  <p>{wordArray[this.generateRandomNumber(wordArray)]}</p>
                </li>
              )
            })
          }
        })}

        {
          this.state.finalWord.map( (word, index) => {
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
