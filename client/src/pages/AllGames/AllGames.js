import React from "react";
import GameList from "../../components/GameList"
import API from "../../utils/API";

class AllGames extends React.Component{
    state = {
        games: []
    }
    getAllGames(){
        API.getAllGames()
        .then((res)=>{
            this.setState({games: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getAllGames()
    }
    render(){
        return(
            <div>
                <h3>ALL GAMES</h3>
                <GameList games={this.state.games}/>
            </div>
        )
    }
}

export default AllGames