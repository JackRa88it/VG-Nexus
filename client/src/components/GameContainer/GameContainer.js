
import React from 'react'
import './GameContainer.css'

class GameContainer extends React.Component{
    render(){
        return(
            <div className='gamesContainer'>
                <div className='categoryHeader'>{this.props.header}</div>
                {this.props.games.map((game)=>{
                return(
                    <div className='gameBox'>
                    <img src={'../../public/assets/gameThumbnails/' + game.id} />
                    </div>
                )
                })}
            </div>
        )
    }
}

export default GameContainer