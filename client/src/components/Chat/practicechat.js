import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import io from 'socket.io-client'

class Chatroom extends Component{
    state = {
        messages: [],
        newMessage: '',
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
    }

    componentDidMount(){
        this.connect(this.props.gameId);
    }


    componentWillReceiveProps(nextProps){
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
        return(
            <div>
                {this.state.messages.map(message => (
                    this.id ? 
                    (<div><img src={'/assets/userThumbnails/'+message.id}></img><p><a href={"/user/"+message.id}>{message.name}</a>:{message.msg}</p>
                    </div>) :
                    (<div><img src='/assets/userThumbnails/Default1.png'></img><p>{message.name}:{message.msg}</p>
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
export default Chatroom;