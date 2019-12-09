import React, { Component } from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import firebase from "./firebase";

class SavedBackronym extends Component {
    constructor(){
        super();
        this.state = {
            savedBackronyms: null,
            baseWord: "",
        }
    }
    pullFirebase = () => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', snapshot => {
            const data = snapshot.val();
            // console.log(data);
            this.setState({
                savedBackronyms: data,
            })
            // console.log(this.state.savedBackronyms);
            const objectFromFirebase = this.state.savedBackronyms;
            for (let eachKey in objectFromFirebase) {
                const lastItem = objectFromFirebase[eachKey].length - 1;

                this.setState({
                    baseWord: objectFromFirebase[eachKey][lastItem]
                })
            }
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
                    <h3></h3>
                    <li> 
                        
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default SavedBackronym;