import React from "react";
import GameList from "../../components/GameList"
import API from "../../utils/API";

class AllGames extends React.Component{
    state = { games: [] }

    /* explicit API call to set state.games to data returned from backend */
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
                <GameList games={
                    /*  passed an array of `games`
                     as it's only prop */
                    this.state.games } />
            </div>
        )
    }
}

export default AllGames