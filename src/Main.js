import React, {Component} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import QueryWord from "./QueryWord"

class Main extends Component {
    constructor() {
        super();
        this.state = {
            showErrorMessage: true,
            displayError: false,
        };
    }

    preventDefaultFunction = event => {
        event.preventDefault();
        this.props.lettersToBeSpreadProp();
    }

    saveUserInput = event => {
        console.log(event.target);
        const eventHappening = event.target.value;
        this.setState({
            showErrorMessage: false,
        }, () => {
            if (eventHappening.length >= 3 && eventHappening.length <= 6) {
                this.props.QueryWordResultsProp(eventHappening);
                this.setState({
                    showErrorMessage: false,
                    displayError: false,
                })
            } else if (eventHappening.length < 3) {
                this.setState({
                    showErrorMessage: true,
                })
                console.log("Enter at least 3 characters");
            };
        });
    }; 

    displayErrorMessage = () => {
        this.setState({
            displayError: true,
        });
    }

    render(){
        return(
            <main className="wrapper homepage">

                    <div className="mainTextContainer">
                        <h1>You know what's more fun than acronyms?
                            <span className="backronyms">Backronyms.</span>
                        </h1>
                        <p>Enter any word below between three and six letters.<br/>
                        We’ll work our magic and figure out what it stands for as an acronym.</p>
                    </div>

                    <form className="saveInput">
                        <span className="sr-only"><label htmlFor="wordInput">Enter a Word!</label></span>
                            <input type="text" placeholder="type here" id="wordInput" maxLength="6" onChange={this.saveUserInput} />

                            <button tabIndex="-1" className="goButton" onClick={this.preventDefaultFunction}>
                            {this.state.showErrorMessage === true ? <span onClick={this.displayErrorMessage}>Go</span> : <Link to="/projectSix/search">Go</Link>}
                            </button>
                            
                        {this.state.displayError ? <span className="characterLengthError">Please enter a word with at least three letters but no more than six.</span> : null}
                    </form>
            </main>
        )
    }
}

export default Main;