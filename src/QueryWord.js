import React, { Component } from "react";
import axios from "axios";

class QueryWord extends Component {
  constructor() {
    super();
    this.state = {
      lettersToQuery: [],
      displayedWords: [],
      firstWordArray: [],
      firstSelectedWord: "",
    };
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
      // console.log(data.data);
      const arrayOfLetterObject = data.data;
      this.setState({
        firstWordArray: arrayOfLetterObject,
      })
      }).then( () => {
        this.state.firstWordArray.map( value => {
          // console.log(value.word);         
        })
        let randomWordNumber = Math.floor(Math.random() * this.state.firstWordArray.length);
        // console.log(randomWordNumber);
        const firstWord = (this.state.firstWordArray[randomWordNumber].word);
        console.log(firstWord);
        this.setState({
          firstSelectedWord: firstWord,
        });
      })
  }

  callToApiSecond = (nextLetter) => {
    axios ({
      url: `https://api.datamuse.com/words`,
      method: "get",
      params: {
        sp: `${nextLetter}*`,
        max: 10
      }
    }).then( (data) => {
      // this.state.lettersToQuery.map()
      console.log(data.data)
    })
  }

  componentDidMount() {
    // console.log(this.props.spreadLettersProp);
    this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
    // this.callToApiSecond(this.props.spreadLettersProp[])
    for (let i = 1; i < this.props.spreadLettersProp.length; i++){
      console.log(this.callToApiSecond(this.props.spreadLettersProp[i]));
    }
  }

  render() {
    // firstWordArray.map( value => {
    //   console.log(value);
    // })
    return (
      <React.Fragment>
        {/* {randomWordNumber = Math.floor(Math.random() * this.state.firstWordArray.length)} */}
        {/* <h3>{this.state.firstWordArray[randomWordNumber].word}</h3> */}
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
