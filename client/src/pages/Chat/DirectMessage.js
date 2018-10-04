import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import io from 'socket.io-client'
import {ActiveChat} from "../../components/Chat"

class DirectMessage extends Component{
    state = {
        messages: [],
        newMessage: '',
        activeChats: [],
        joined: false
      };
    socket = null
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.newMessage) {
            console.log(this.state)
            this.socket.emit('newMessage',this.state.newMessage)
        }
    };
    componentDidMount(){
        console.log('component mounted')
        // this.socket=io.connect('http://localhost:3001')
        // this.socket.on('messageBroadcast',(message)=>{
        //     this.setState({messages:this.state.messages.concat([message])})
        // })

    }
    joinChat = () => {
        API.joinChat()
            .then((res) => {
                this.setState({activeChats: res.data, joined: true},()=>console.log(this.state))
            })
            // .catch(err => console.log(err))
    }

    joinChannel = (channel) => {
        console.log(channel)
        if(this.socket){
            this.socket.disconnect()
        }
        this.socket = io('http://localhost:3001' + channel)
        this.socket.on('messageBroadcast',(message)=>{
            console.log('message received')
            this.setState({messages:this.state.messages.concat([message])})
        })
    }

    render(){
        return(
            <div>
                {this.state.joined ? null : <FormBtn
                    onClick={this.joinChat}>
                    Submit
                </FormBtn>}
                {this.state.activeChats.map(channel => (
                    <ActiveChat onClick={()=>{this.joinChannel(channel)}}>{channel}</ActiveChat>
                ))}
                {this.state.messages.map(message => (
                    (<div><p>{message}</p>
                    </div>)
                ))}
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="newMessage"
                />
                <FormBtn
                    disabled={!(this.state.newMessage)}
                    onClick={this.handleFormSubmit}>
                    Submit
                </FormBtn> 
                
            </div>
        )
    }
}

export default DirectMessage;
