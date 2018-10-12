import React from "react";
import "./ForumAvatar.css";
var moment = require("moment");


const ForumAvatar = (props) => {

  return(
  <div className="avatarContainer">
    <img className="avatarImage" src={props.user.User.avatar}/> 
    <div className="username" onClick={props.handleUsernameClick}>{props.user.User.username}</div>
    <div className="userScore">{props.user.User.score}</div>
    <div className="createdAt">{moment(props.user.User.createdAt).format('DD/MM/YYYY')}</div>
  </div>
  )
}

export default ForumAvatar;