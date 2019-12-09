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
// sends the final word up to firebase, each individual word/object makes an array
  handleFirebaseSubmit =() => { 
    const dbRef = firebase.database().ref(); 
    const submittedWords =  this.state.finalWord;
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
        const arrayForFirstWord = [];
        arrayForFirstWord.push(firstWord)
        this.setState({
          firstSelectedWord: firstWord,
          finalWord: arrayForFirstWord
        });
      }).then(() => {
        let lastLetter = false;
        for (let i = 1; i <= this.props.spreadLettersProp.length - 1; i++) {
          if (i === this.props.spreadLettersProp.length - 1) {
            lastLetter = true;
          }
          this.callToApiSecond(this.props.spreadLettersProp[i], this.state.finalWord[i], lastLetter);
        }
      })
  }

  callToApiSecond = (nextLetter, prevWord, isItWordFinal) => {
      axios ({
        url: `https://api.datamuse.com/words`,
        method: "get",
        params: {
          lc: `${prevWord}`,
          sp: `${nextLetter}*`,
          md: "p"
        }
      }).then((data) => {
        if (data.data.length < 2) {
          this.randomWordApiCall(nextLetter, isItWordFinal);
        } else {
          this.handleApiData(data, isItWordFinal);
        }
      })
    }

    randomWordApiCall = (nextLetter, isItWordFinal) => {
      axios ({
        url: `https://api.datamuse.com/words`,
        method: "get",
        params: {
          sp: `${nextLetter}*`,
          max: 100,
          md: "p"
        }
      }).then((data) => {
        this.handleApiData(data, isItWordFinal);
      })
    }

    handleApiData = (data, isItWordFinal) => {
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
        const fillerWord = ["of", "and"];
        const randomFillerWord = this.generateRandomNumber(fillerWord);
        console.log(fillerWord, randomFillerWord)
        finalWord = [...this.state.finalWord];
        const wordToPush = newWordArray[this.generateRandomNumber(newWordArray)]
        if (isItWordFinal) { //check if it's word final letter to avoid 'of'
          finalWord.push(newWordArray[this.generateRandomNumber(newWordArray)].word)
        } else { //otherwise throw 'of' on the end!
          for (let i = 0; i <= wordToPush.tags.length; i++) {
            if (wordToPush.tags[i] === "n") {
              isItANoun = true;
            }
          }
          if (isItANoun) {
            actualStringToPush = `${wordToPush.word} ${fillerWord[randomFillerWord]}`
          } else {
            actualStringToPush = `${wordToPush.word}`
          }
          finalWord.push(actualStringToPush)
        }
        this.setState({
          finalWord: finalWord,
        });
    }

  componentDidMount() {
    this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  render() {
    return (
      <React.Fragment>
        <section className="wordListContainer wrapper">
        <h2>You searched the word:</h2>
        <h3>Word</h3>
        <h2>Which <em>clearly</em> stands for:</h2>

        <ul className="wordChoicesList">
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
          <div class="queryWordsHandlingButton">
            <button className="tryAnotherButton">Try another</button>
            <button type="submit" className="submitWordButton" onClick={this.handleFirebaseSubmit}>Submit your word</button>
          </div>
        </section>
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
