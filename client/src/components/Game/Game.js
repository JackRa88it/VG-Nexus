import React from "react";
import "./Game.css"
import CommentList from "../CommentList"
const Game = (props) => (
  <div>
    <h1 className="text-center">Game {props.match.url.split("/").pop()}</h1>
    <p>
     Developer: User_12314
    </p>
    <div className="simGame bg-dark" />
    <CommentList />

  </div>
);

export default Game;
