import React, { Component } from "react";
import axios from "axios";

class QueryWord extends Component {
  constructor() {
    super();
    this.state = {
      lettersToQuery: [],
      displayedWords: [],
      firstWordArray: [],
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
      console.log(data.data);
      const arrayOfLetterObject = data.data;
      // this.setState({
      //   firstWordArray: arrayOfLetterObject,
      // })
    }) 
  }

  callToApiSecond = (nextLetter) => {
    axios ({
      url: `https://api.datamuse.com/words`,
      method: "get",
      params: {
        sp: `${nextLetter}*`,
        max: 100
      }
    })
  }
  componentDidMount(){
    console.log(this.props.spreadLettersProp);
    this.callToApiFirst(this.props.userInputProp, this.props.spreadLettersProp[0]);
  }

  render() {
    // console.log(this.state.lettersToQuery);
    // this.callToApiFirst(this.props.userInputProp, this.state.lettersToQuery[0]);
    return (
      <React.Fragment>
        {/* <h2>{this.state.firstWordArray[0].word}</h2> */}
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
