import React, { Component } from "react";
import axios from "axios";
import firebase from "./firebase";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Qs from 'qs';

class QueryWord extends Component {
  constructor() {
    super();
    this.state = {
      firstWordArray: [], // array of response from first API call
      firstSelectedWord: "", // random word from first call
      restOfWordsArray: [], // array to store API word responses
      finalWord: [], // array to store generated words
      thatsNotAWord: false, // error handling on initial submit
    };
  }

  // sends the final word up to firebase, each individual word/object makes an array
  handleFirebaseSubmit = () => {
    const dbRef = firebase.database().ref(); 
    dbRef.push({
      entireWord:this.props.userInputProp,
      words:this.state.finalWord + "",
    });
  }

  // called to pick random object from given array
  generateRandomNumber = (array) => {
    return(Math.floor(Math.random() * array.length))
  }

  // an API call to kick it off!!
  // called with props: userInputProp and spreadLettersProp[0] (first letter of word!)
  callToApiFirst = (userWord, firstLetter) => {
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse:'json',
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      params: {
        reqUrl: 'https://api.datamuse.com/words',
        params: {
          ml:`${userWord}`, // first word is related to the input word
          sp: `${firstLetter}*`, // spelled with first letter in first position
          md: "p" // return metadate information as well (to use later)
        }, 
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    })
    .then((data)=>{
      // error handling: if there is no response, datamuse does not recognize the word
      if (data.data.length === 0) {
        this.setState({
          thatsNotAWord: true // used to conditionally display error message in render
        })
      } else { // if the response contains data, then:
        // set a variable to hold the returned array of word objects
        // we want to keep the whole object to conserve the metadata tags
        const arrayOfLetterObject = data.data;
        this.setState({
          firstWordArray: arrayOfLetterObject,
        })
      }
    }).then( () => {
      // first make sure we actually got a return on the last step.
      if (this.state.thatsNotAWord === false) {
        // pick a random word object from our saved array,
        // get an actual word from that object
        let randomWordNumber = this.generateRandomNumber(this.state.firstWordArray);
        const firstWord = (this.state.firstWordArray[randomWordNumber].word);
        // set an array to conserve data format of our 'final word' state
        const arrayForFirstWord = [];
        arrayForFirstWord.push(firstWord)
        this.setState({
          firstSelectedWord: firstWord,
          finalWord: arrayForFirstWord
        });
      }
    }) //set an async function to await the result of each call before making the next
    .then( async () => {
      if (this.state.thatsNotAWord === false) {
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
      }
    })
  }

  callToApiSecond = (nextLetter, prevWord, isItWordFinal) => {
    // return a promise to facilitate the async call
    return new Promise((resolve, reject) => {
      axios({
        url: 'https://proxy.hackeryou.com',
        dataResponse:'json',
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        params: {
          reqUrl: 'https://api.datamuse.com/words',
          params: {
            lc: `${prevWord}`, // likely follows specified word
            sp: `${nextLetter}*`,
            md: "p"
          }, 
          proxyHeaders: {
            'header_params': 'value'
          },
          xmlToJSON: false
        }
      })
      .then((data) => {
        resolve(data);
      })
    })
  }

  // just to call a word that starts with a certain letter if all else fails!
  randomWordApiCall = (nextLetter, isItWordFinal) => {
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse:'json',
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      params: {
        reqUrl: 'https://api.datamuse.com/words',
        params: {
          sp: `${nextLetter}*`,
          md: "p"
        }, 
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    })
    .then((data) => {
      // call handle method on returned array
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
    // and make the generated 'backronym' read like a sentence/sentence fragment
    const fillerWord = ["of", "and"];
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
      if (isItANoun) { // IS IT A NOUN, DATAMUSE?! (it might not be)
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

  // call the first api call on mount! kick the whole party off!
  componentDidMount() {
    this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  // in case the user doesn't like generated word, allow them to retry
  searchAgain = () => {
  this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  render() {
    // first make sure we haven't gotten our "not a word" error.
    if (this.state.thatsNotAWord) {
      return (
        <section className="wordListContainer wrapper">
          <h3>I don't think that's a real word...</h3>
          <Link to="/projectSix">Try Again</Link>
        </section>
      )
    } else { // then check if all of our calls have resolved and render results!
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
                  <Link className="submitWordLink" onClick={this.handleFirebaseSubmit} to="/projectSix/SavedBackronym">
                    Submit your word
                  </Link>
              </div>
            </section>
          </React.Fragment>
        )
      } else { //if not all calls have resolved, display a loading message.
        return (
          <section className="wordListContainer wrapper">
            <h3>Generating Backronym...</h3>
          </section>
        )
      }
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