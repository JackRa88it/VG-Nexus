import React, { Component } from 'react';
import CommentList from "../CommentList"
import GameContainer from '../GameContainer'
import Chatroom from "../Chat/gameChat"
import {Container,Col,Row} from "../../components/Grid"
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
                    <div className = 'gameRow px-auto'>
                    <Container lighter>
                        <div className="mx-auto w-100">
                        <Col size="md-9" className='mx-auto'>
                            <h3>Suggested Games</h3>
                            <GameContainer games = {this.state.randomGames}/>
                        </Col>
                        </div>

                        <Col size="md-9">
                            <CommentList gameId = {this.props.match.params.id}/>
                        </Col>
                        
                        
                    </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
