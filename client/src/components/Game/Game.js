import React, { Component } from 'react';
import CommentList from "../CommentList"
import Chatroom from "../Chat/gameChat"
import API from '../../utils/API'


import './Game.css'
class Game extends Component{
    state = {
        comments: [],
        description: '',
        name: '',
        createdAt: '',
        username: '',

    };
     
    componentDidMount(){
        API.getGameData(this.props.match.params.id)
        .then((res) => {
            if(res.data){
                this.setState({
                    description: res.data.description,
                    name: res.data.name,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt,
                    username: res.data.User.username,
                    userId: res.data.User.id})
            }
        })
    }
    
    render(){
        return(
            <div>
                <h1 className="text-center">Game {this.props.match.url.split("/").pop()}</h1>
                <p>
                    Developer: User_12314
                </p>
                <div className="w-100">
                    <div className='d-inline-flex w-100 ml-5'>
                        <iframe title="gamewindow"
                            scrolling="no"
                            id="gameView"
                            height="500"
                            width="100%"
                            src={'/games/'+this.props.match.params.id}
                            allowFullScreen></iframe>
                    
                        <Chatroom gameId = {this.props.match.params.id} />
                    </div>
                    <CommentList gameId = {this.props.match.params.id}/>
                </div>
                
            </div>
        )
    }
}

export default Game;
