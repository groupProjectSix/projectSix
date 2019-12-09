import React, {Component} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import QueryWord from "./QueryWord"

class Main extends Component {

    preventDefaultFunction = event => {
        event.preventDefault();
        this.props.displayButtonProp();
        this.props.lettersToBeSpreadProp();
    }

    saveUserInput = event => {
        this.props.QueryWordResultsProp(event.target.value);
    }; 

    render(){
        return(
            <main className="wrapper">
                <form className="saveInput">
                    <span className="sr-only"><label htmlFor="wordInput">Enter a Word!</label></span>

                    <input type="text" placeholder="type here" id="wordInput" maxLength="8" minLength="4" onChange={this.saveUserInput} />
    

                    <button 
                        onClick={this.preventDefaultFunction} 
                        type="submit">
                        <Link to="/search">
                            Go
                        </Link>
                    </button>

                </form>
            </main>
        )
    }
}

export default Main;