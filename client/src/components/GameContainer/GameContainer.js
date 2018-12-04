
import React from 'react'
import './GameContainer.css'
import { Link } from "react-router-dom";

class GameContainer extends React.Component{
    //Displays icons of all of the games passed to this component inside of a container
    render(){
        if (this.props.games.length) {
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
        else {
            return(
                <div className='gamesContainer'>
                    <div className='categoryHeader'>{this.props.header}</div>
                    {'(no games)'}
                </div>
            )
        }
    }
}

export default GameContainer