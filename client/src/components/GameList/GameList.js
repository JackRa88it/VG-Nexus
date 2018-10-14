
import React from 'react'
import './GameList.css'
import { Link } from "react-router-dom";

class GameList extends React.Component{
    render(){
        return(
            <div className='gamesList'>
                <div className='categoryHeader'>{this.props.header}</div>
                {this.props.games.map((game)=>{
                return(
                    <Link to={"/all/games/" + game.id}>
                        <div className='gameListItem'>
                        <img src={'/assets/gameThumbnails/' + game.id}></img>
                        <div>{game.description}</div>
                        <div>{game.name}</div>
                        <div>{game.rating}</div>
                        <div>{game.createdAt}</div>
                        </div>
                    </Link>
                )
                })}
            </div>
        )
    }
}

export default GameList