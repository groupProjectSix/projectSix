import React, { Component } from "react";
import firebase from "./firebase";

class SavedBackronym extends Component {
    constructor(){
        super();
        this.state = {
            savedBackronyms: [],
        }
    }
    pullFirebase = () => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', snapshot => {
            const data = snapshot.val();
            const backronymsToBe = [];

            for (let key in data) {
                backronymsToBe.push(data[key]);
            }
            this.setState({
                savedBackronyms: backronymsToBe,
            })
        })
    }

    componentDidMount(){
        this.pullFirebase();
    }

    render(){ 
        return(
            <React.Fragment>
                <main className="wrapper">
                    <div className="hallOfLiteracyFameHeader">
                        <h2>Hall of Literacy Fame</h2>
                    </div>
                    <div className="resultsContainer">
                        {this.state.savedBackronyms.length !== 0 
                        ? this.state.savedBackronyms.map( (value) => {
                            const wordsWithCommas = value.words;
                            const wordsWithSpaces = wordsWithCommas.replace(/[,]/g, " ");
                            return(
                                <React.Fragment>
                                    <div className="resultHeader">
                                        <h3>{value.entireWord}</h3>
                                        <div className="wordsContainer">
                                            <p>{wordsWithSpaces}</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                        : <h3>Waiting for data to load...</h3>}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default SavedBackronym;