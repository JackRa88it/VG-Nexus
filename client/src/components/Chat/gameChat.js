import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import io from 'socket.io-client'
import {ActiveChat} from "."
import './gameChat.css'

class Chatroom extends Component{
    state = {
        messages: [],
        newMessage: '',
        location: 'chatroom'
    }
    socket = null
    name = "Anonymous"
    id;
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.newMessage) {
            this.socket.emit('messagePost', this.state.newMessage, this.name, this.id)
        }
        this.setState({newMessage: ''})
    }

    handleTabClick = event => {
        console.log("tab clicked")
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


    componentDidMount(){
        this.connect(this.props.gameId);
    }


    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({messages: []})
        this.connect(nextProps.gameId)
    }

    connect(gameId) {
        if (this.socket){
            this.socket.disconnect();
        }
        this.socket = io.connect("http://localhost:3001/game/" + gameId);
        API.authenticate().then((res) => {
            this.name = res.data.username;
            this.id = res.data.id
        });
        this.socket.on("messagePost", (msg, name, id) => {
            this.setState({ messages: [...this.state.messages, {name: name, id: id, msg: msg}] });
        });
    }
    render(){
      if(this.state.location === "chatroom"){
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
                    {this.state.messages.map((message, i) => (
                        this.id ? 
                        (<div><p className={"chatroom-message"+ (i%2)}><a href={"/user/"+message.id}>{message.name}</a>: {message.msg}</p>
                        </div>) :
                        (<div><p className={"chatroom-message"+ (i%2)}>{message.name}: {message.msg}</p>
                        </div>)
                    ))}
                </div>
                <div className = "messageandbutton">
                    <Input
                        className = "currentmsg"
                        value={this.state.newMessage}
                        onChange={this.handleInputChange}
                        name="newMessage"
                    />
                    <button
                        className = "msgbutton"
                        disabled={!(this.state.newMessage)}
                        onClick={this.handleFormSubmit}> 
                        <i className="fab fa-telegram-plane"></i>
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