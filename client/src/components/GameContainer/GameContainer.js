
import React from 'react'
import './GameContainer.css'
import { Link } from "react-router-dom";

class GameContainer extends React.Component{
    
    // disablePageMove = (e) =>{
    //     if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    //         e.preventDefault();
    //     }
    // }
    // componentDidMount(){
    //     window.addEventListener("keydown",this.disablePageMove,false);
    // }
    // componentWillUnmount(){
    //     window.removeEventListener("keydown",this.disablePageMove,false);
    // }

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