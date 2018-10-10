import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import io from 'socket.io-client'
import {ActiveChat} from "."
import './gameChat.css'
var moment =require("moment");

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
            [name]: value.substring(0,300)
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.newMessage) {
            const now = moment().format('h:mm:ssa')
            this.socket.emit('messagePost', this.state.newMessage, this.name, this.id, String(now))
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
            const _now = moment().format('hh:mm:ssa')
            this.setState({ messages: [...this.state.messages, {name: name, id: id, msg: msg, now:_now}] });
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
                        (<div>
                            <p className={"px-3 my-1 py-1 chatroom-message"+ (i%2)}>
                            <div className="border-bottom mb-1">
                                <a href={"/user/"+message.id}><em>{message.name.substring(0,24)}</em></a>
                                <small id='time' className="float-right pt-1">{message.now}</small><br></br>
                            </div>
                            <span id='msg'>{message.msg.substring(0,250)}</span>
                            </p>
                        </div>) : <span></span>
                        /* SHOULD THIS BE DELETED? */
                        // (<div className="mx-3 py-1"><p className={"chatroom-message"+ (i%2)}>{message.name}: {message.msg}</p>
                        // </div>)
                    ))}
                </div>
                <div className = "messageandbutton">
                    <input
                        className = "currentmsg"
                        value={this.state.newMessage.substring(0,250)}
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