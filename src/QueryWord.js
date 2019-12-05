import React, { Component } from "react";
import axios from "axios";

class QueryWord extends Component {
  constructor() {
    super();
    this.state = {
      lettersToQuery: [],
      displayedWords: [],
    };
  }

  callToApiFirst = (userWord, firstLetter) =>{
    axios({
      url:`https://api.datamuse.com/words`, 
      method: "get", 
      params:{ 
          ml:`${userWord}`,
          sp: `${firstLetter}*`
        }
      }).then((data)=>{
      console.log(data)
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
    const fackinletters = this.props.userInputProp;
    const spreadLetters = [...fackinletters];
    this.setState({
      lettersToQuery: spreadLetters
    })
    console.log(fackinletters)
    console.log(this.state.lettersToQuery)
    this.callToApiFirst(this.props.userInputProp, this.state.lettersToQuery[0]);
  }

  render() {
    return <React.Fragment>

    </React.Fragment>;
  }
}  
export default QueryWord;

// base url https://api.datamuse.com/words

// params:
// rel_bga:
// sp:
// rel_bga would be the word we want the call to relate TO
// sp: is how we want the RESPONSE to be spelled like
