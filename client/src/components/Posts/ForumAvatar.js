import React from "react";
import "./ForumAvatar.css";
var moment = require("moment");

// className="avatarImage"
const ForumAvatar = (props) => {

  return(
  <div className="avatarContainer">
    <div className="avatar">
      <img src={"/assets/userThumbnails/"+ props.user.User.id}/> 
    </div>
    <a href={"/profile/"+props.user.User.id}><em className="username">{props.user.User.username}</em></a>
    <div className="userScore">{'score: ' + props.user.User.score}</div>
    <div className="createdAt">{'Joined: ' + moment(props.user.User.createdAt).format('MMM YYYY')}</div>
  </div>
  )
}

export default ForumAvatar;