import React from "react";
import { Link, Route } from "react-router-dom";
import Game from "../../components/Game/";

// REVIEW for use
const ChooseGame = props => (
  <div>
    <Route path={`${props.match.url}/games/:id/`} component={Game}  gamePath={'/1'}/>
  </div>
);

export default ChooseGame;
