import React from "react";
import { Link, Route } from "react-router-dom";
import Game from "../../components/Game/";

const ChooseGame = props => (
  <div>
    <h1>Titanium Snake</h1>
    <hr></hr>
    <p>
      You can play the game in two different ways. The first way is by controlling the sprite through the the arrow keys.
      The other way is by directing the sprite with the mouse.
    </p>
    <Link to="/all" role="button" className="border bg-secondary text-light p-2 btn btn-link"> Select a Game </Link>
  <br></br>
    <div className="gameList">
      <div className="imgFill">
      <img src='/assets/gameThumbnails/1' alt='Logo'></img>
      <Link to={`${props.match.url}/games/1/`} 
            role="button" 
            className="btn btn-link"> 
      Game 1 </Link> 
      </div>
      <div className="imgFill">
      <img src='/assets/gameThumbnails/2' alt='Logo'></img>
      <Link to={`${props.match.url}/games/2/`} 
            role="button" 
            className="btn btn-link">
      Game 2 </Link>
      </div>
      
      <div className="imgFill">
      <Link to={`${props.match.url}/games/3`} 
            role="button" 
            className="btn btn-link">
      Game 3 </Link>
      </div>
      
      
      <div className="imgFill">
      <Link to={`${props.match.url}/games/4`} 
            role="button" 
            className="btn btn-link">
      Game 4 </Link>

      </div>    
      
      <div className="imgFill">
      <Link to={`${props.match.url}/games/5`} 
            role="button" 
            className="btn btn-link">
      Game 5 </Link>

      </div>


    </div>

    <Route path={`${props.match.url}/games/:id/`} component={Game}  gamePath={'/1'}/>



  </div>
);

export default ChooseGame;
