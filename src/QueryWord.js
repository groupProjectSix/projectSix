import React, { Component } from "react";
import axios from "axios";
import firebase from "./firebase";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

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
  
    dbRef.push({
      entireWord:this.props.userInputProp,
      words:this.state.finalWord + "",

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
    }) //set an async function to await the result of each call before making the next
    .then( async () => {
      let lastLetter = false;
      //set up a loop to go through the remaining letters of user word
      for (let i = 1; i <= this.props.spreadLettersProp.length - 1; i++) {
        // check if we're on the last letter
        if (i === this.props.spreadLettersProp.length - 1) {
          lastLetter = true;
        }
        // setting a new variable to hold our api return PROMISE
        const newWords = this.callToApiSecond(this.props.spreadLettersProp[i], this.state.finalWord[i]);
        //wait for it....
        await newWords.then((data) => {
          // determine if we have a data return; I went for at least 2 for variety
          if (data.data.length < 2) {
            this.randomWordApiCall(this.props.spreadLettersProp[i], lastLetter);
          } else { //otherwise pull a random response so we keep our word.
            this.handleApiData(data, lastLetter);
          }
        })
      }
    })
  }

  callToApiSecond = (nextLetter, prevWord, isItWordFinal) => {
    return new Promise((resolve, reject) => {
      axios ({
        url: `https://api.datamuse.com/words`,
        method: "get",
        params: {
          lc: `${prevWord}`,
          sp: `${nextLetter}*`,
          md: "p"
        }
      }).then((data) => {
        resolve(data);
      })
    })
  }

  randomWordApiCall = (nextLetter, isItWordFinal) => {
    axios ({
      url: `https://api.datamuse.com/words`,
      method: "get",
      params: {
        sp: `${nextLetter}*`,
        md: "p"
      }
    }).then((data) => {
      this.handleApiData(data, isItWordFinal);
    })
  }

  //function to check, filter, and work with API returns
  handleApiData = (data, isItWordFinal) => {
    const newWordArray = []; //empty array for our new word friends
    data.data.map((wordObject) => {
      newWordArray.push(wordObject)
    })
    //fill an array with info ALREADY in state, so everything pushes in order
    const ongoingWordArray = [...this.state.restOfWordsArray];
    ongoingWordArray.push(newWordArray)
    //reset state to the array plus new value!
    this.setState({
      restOfWordsArray: ongoingWordArray
    });
    let finalWord = []; //this is our final word STRING
    let isItANoun = false; //default to false; to be checked later
    let actualStringToPush = "";
    //some filler words to pretend anything in this crazy universe could make sense.
    const fillerWord = ["of", "and", "or"];
    const randomFillerWord = this.generateRandomNumber(fillerWord); //self-explanatory?
    //similar to above.
    finalWord = [...this.state.finalWord];
    const wordToPush = newWordArray[this.generateRandomNumber(newWordArray)]
    if (isItWordFinal) { //check if it's word final letter to filter results FIRST
      const finalWordArray = newWordArray.filter((word) => {
        return word.tags; //not all words have metadata tags
      }).filter((word) => {
        return word.tags[0] === "n"; // get the "nouns", according to datamuse
        //not to throw shade but "AT" IS NOT A NOUN
      })
      finalWord.push(finalWordArray[this.generateRandomNumber(finalWordArray)].word)
    } else if (wordToPush.tags) {
      for (let i = 0; i <= wordToPush.tags.length; i++) {
        if (wordToPush.tags[i] === "n") {
          isItANoun = true;
        }
      }
      if (isItANoun) { // IS IT A NOUN, DATAMUSE?! IT MIGHT NOT BE
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

  searchAgain = () => {
  this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  render() {
    if (this.state.finalWord.length === this.props.spreadLettersProp.length) {
      return (
        <React.Fragment>
          <section className="wordListContainer wrapper">
          <h2>You searched the word:</h2>
          <h3>{this.props.userInputProp}</h3>
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
            <div className="queryWordsHandlingButton">
              <button className="tryAnotherButton" onClick={this.searchAgain}>Try again</button>
              <button type="submit" className="submitWordButton" onClick={this.handleFirebaseSubmit}>
                <Link to="/SavedBackronym">
                  Submit your word
                </Link>
              </button>
            </div>
          </section>
        </React.Fragment>
      )
    } else {
      return (
        <section className="wordListContainer wrapper">
          <h3>Generating Backronym...</h3>
        </section>
      )
    }
  }
}
export default QueryWord;

// base url https://api.datamuse.com/words

// params:
// rel_bga:
// sp:
// rel_bga would be the word we want the call to relate TO
// sp: is how we want the RESPONSE to be spelled like

// const backronymsToBe = [];
// const data = snapshot.val();

// for (let key in data) {
//   backronymsToBe.push(data[key]);
// }

// this.setState({
//   savedBackronyms: backronymsToBe,
// })