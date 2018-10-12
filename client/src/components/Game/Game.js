import React, { Component } from 'react';
import CommentList from "../CommentList"
import GameContainer from '../GameContainer'
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
        upVoted: false,
        downVoted: false,
        score: 0,
        favorite: false,
        randomGames: []
    };
    getRandom(){
        API.getRandom()
        .then((res)=>{
          this.setState({randomGames:res.data})
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    voteGameHandler = (gameId,bool) => {
        API.postGameVote(gameId,bool)
        .then((res)=>{
          this.getGame(gameId)
        })
        .catch((err) =>{
          console.log(err)
        })
    }

    getGame = (id) =>{
        API.getGameData(id)
        .then((res) => {
            if(res.data){
                console.log(res.data)
                this.setState(res.data)
            }
        })
    }
    componentDidMount(){
        this.getGame(this.props.match.params.id)
        this.getRandom()
    }
    
    render(){
        return(
            <div>
                <div>
                    <h1 className="text-center">{this.state.name}</h1>
                    <div>({this.state.score})</div>
                    <div className ={'gameUpvote ' + (this.state.upVoted ? 'gameUpvoted' : '')} onClick={(this.upVoted ? ()=>{} : ()=>{this.voteGameHandler(this.props.match.params.id,true)})}>+</div>
                    <div className = {'gameDownvote ' + (this.state.downVoted ? 'gameDownvoted' : '')} onClick={(this.state.downVoted ? ()=>{} : ()=>{this.voteGameHandler(this.props.match.params.id,false)})}>-</div>
                </div>
                <div className="w-100">
                    <div className='d-inline-flex w-100 ml-5'>
                        <iframe title="gamewindow"
                            scrolling="no"
                            id="gameView"
                            height="500"
                            width="680"
                            src={'/games/'+this.props.match.params.id}
                            allowFullScreen></iframe>
                    
                        <Chatroom gameId = {this.props.match.params.id} gameInfo={this.state} />
                    </div>
                    <div class = 'gameRow'>
                        <div class='commentCol'>
                            <CommentList gameId = {this.props.match.params.id}/>
                        </div>
                        <div class='suggestedCol'>
                            <h3>Suggested Games</h3>
                            <GameContainer games = {this.state.randomGames}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
