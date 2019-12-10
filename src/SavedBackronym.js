import React, { Component } from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import firebase from "./firebase";

class SavedBackronym extends Component {
    constructor(){
        super();
        this.state = {
            // savedBackronyms: null,
            baseWord: [],
        }
    }
    pullFirebase = () => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', snapshot => {
            const data = snapshot.val();
            console.log(data[0]);
            // this.setState({
            //     savedBackronyms: data,
            // })
            // console.log(this.state.savedBackronyms);
            // const objectFromFirebase = this.state.savedBackronyms;
            // for (let eachKey in objectFromFirebase) {
                // const lastItem = objectFromFirebase[eachKey].length - 1;
                // const lastItem = objectFromFirebase[eachKey].splice(-1, 1);
                // const merged = lastItem.concat(objectFromFirebase[eachKey].splice(-1, 1)) 
                // console.log(lastItem)
                // objectFromFirebase[eachKey][lastItem]
                // const testArray = [];

                // testArray.push(objectFromFirebase[eachKey][lastItem])
                // this.setState({
                //     baseWord: testArray,
                // })
                // console.log(testArray)
                // console.log(objectFromFirebase[eachKey])
            // }
        }); 
        
    } 


    componentDidMount(){
        this.pullFirebase();
    }

    render(){ 
        return(
            <React.Fragment>
                <h2>Hall of Fame</h2>

                <ul>
                    <li> 
                        <h3></h3>
                        <p></p>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default SavedBackronym;