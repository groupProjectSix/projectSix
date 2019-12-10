import React,{Component} from "react" 
import {Link} from "react-router-dom"

class Footer extends Component{
    render(){
        return(
            <footer>
                <p> © Backronym Generator 2019. Created By: </p>
                <p>  
                    <a target="_blank" href={'http://sandy.codes'}>Sandy Pranjic</a>
                    <a target="_blank" href={'http://www.lynsey.codes'}>Lynsey O'Donnell</a>
                    <a target="_blank" href={'http://wadebutler.ca/'}>Wade Butler</a>
                    <a target="_blank" href={'http://www.bethancdavies.com'}>Bethan Davies</a>
                </p>
                
                
            </footer>
        )
    }
} 
export default Footer