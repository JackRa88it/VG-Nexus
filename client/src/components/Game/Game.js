import React, { Component } from 'react';
import CommentList from "../CommentList"

import './Game.css'
class Game extends Component{
    render(){
        return(
            <div>
                <h1 className="text-center">Game {this.props.match.url.split("/").pop()}</h1>
                <p>
                    Developer: User_12314
                </p>
                <iframe src='/user/index.html'></iframe>
                <div className="simGame bg-dark" />
                <CommentList />
            </div>
        )
    }
}

export default Game;
