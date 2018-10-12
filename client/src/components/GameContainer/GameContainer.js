
import React from 'react'
import './GameContainer.css'
import { Link } from "react-router-dom";

class GameContainer extends React.Component{
    render(){
        return(
            <div className='gamesContainer'>
                <div className='categoryHeader'>{this.props.header}</div>
                {this.props.games.map((game)=>{
                return(
                    <Link to={"/all/games/" + game.id}>
                        <div className='gameBox'>
                        <img src={'/assets/gameThumbnails/' + game.id}></img>
                        </div>
                    </Link>
                )
                })}
            </div>
        )
    }
}

export default GameContainer