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
            // console.log(this.state.savedBackronyms[0].entireWord)
        })

        // this.state.savedBackronyms
    }
    
        
        // dbRef.on('value', snapshot => {
        //     const data = snapshot.val();
        //     console.log(data[0]);
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
    //     }); 
        
    // } 


    componentDidMount(){
        this.pullFirebase();
    }

    render(){ 
        console.log(this.state.savedBackronyms)
        return(
            <React.Fragment>
                <main className="wrapper">
                    <div className="hallOfLiteracyFameHeader">
                        <h2>Hall of Literacy Fame</h2>
                    </div>
                    <div className="resultsContainer">
                        {this.state.savedBackronyms.length !== 0 
                        ? this.state.savedBackronyms.map( (value) => {
                            console.log(value)
                            const wordsWithCommas = value.words;
                            const wordsWithSpaces = wordsWithCommas.replace(/[,]/g, " ");
                            console.log(wordsWithSpaces);
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