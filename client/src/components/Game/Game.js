import React, { Component } from 'react';
import CommentList from "../CommentList"

import './Game.css'
class Game extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <h1 className="text-center">Game {this.props.match.url.split("/").pop()}</h1>
                <p>
                    Developer: User_12314
                </p>
                <div className="simGame bg-dark" >
                <iframe src={'/'+this.props.match.params.id + '/' + this.props.match.params.title}></iframe>
                </div>
                <CommentList />
            </div>
        )
    }
}

export default Game;
