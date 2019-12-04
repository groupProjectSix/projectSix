import React, { Component } from "react";
import axios from "axios";

class QueryWord extends Component {
  constructor() {
    super();
      this.setState = {
        lettersToQuery: []
      };
  }   

    callToApI = (queryWord) =>{
             axios({
                url:`https://api.datamuse.com/words`, 
                method: "get", 
                params:{ 
                   
                    ml:`${queryWord}`
                 }
                }).then((data)=>{
          console.log(data)
      }) 
      
      }  
  componentDidMount(){
    this.callToApI (this.props.userInputProp)
  }
  render() {
    return <React.Fragment></React.Fragment>;
  }
}  
export default QueryWord;

// base url https://api.datamuse.com/words

// params:
// rel_bga:
// sp:
// rel_bga would be the word we want the call to relate TO
// sp: is how we want the RESPONSE to be spelled like
