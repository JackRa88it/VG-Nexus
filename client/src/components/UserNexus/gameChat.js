import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import io from 'socket.io-client'
import {ActiveChat} from "."
import './gameChat.css'

class Chatroom extends Component{

    state = {
        location: 'Profile'
    }


    handleFormSubmit = event => {
        event.preventDefault();
    }

    handleTabClick = event => {
        console.log("===========")
        console.log("Tab Clicked")
        console.log("===========")
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
      if(this.state.location === "Profile"){
        return(
            <div className="Profile">
                <div className="gametabs">
                    <button
                     className="profile-tab"
                     name="location"
                     value="Profile"
                     onClick={this.handleTabClick}>
                     Profile
                    </button>
                    <button
                    name="location"
                    value="chatroom" 
                    className="chatroom-tab"
                    onClick={this.handleTabClick}>
                    Games
                    </button>
                </div>
            </div> 
            )
        }
        else if(this.state.location === "details"){
            return(
                <div className="chatroom">
                    <div className="gametabs">
                        <button className="tab-location">Game</button>
                        <button className="fas fa-star"></button>
                        <button
                         className="details-tab"
                         name="location"
                         value="details"
                         onClick={this.handleTabClick}>
                         Details
                        </button>
                        <button
                        name="location"
                        value="chatroom" 
                        className="chatroom-tab"
                        onClick={this.handleTabClick}>
                        Chat
                        </button>
                    </div>
                    <div className="messagedisplay">
                    {this.props.gameDescript}
                    {this.props.gameName}
                    {this.props.createdAt}
                    </div>
                    </div> 
                )
        }
    }
    
}
export default Chatroom;