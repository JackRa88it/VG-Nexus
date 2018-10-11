import React from "react";
import "./Posts.css";
import Authenticator from "../../utils/Authenticator";
import ForumAvatar from "./ForumAvatar"

const PostRow = (props) => {
  const authenticated = Authenticator.isAuthenticated;
  if(authenticated) {
    return(
      <tr>
        <td><ForumAvatar user={props.post} /></td>
        <td>{props.post.text}</td>
        <td>{props.post.User.id === Authenticator.user.id ?
          <button 
            id="editButton" 
            data-postid={props.post.id} 
            data-posttext={props.post.text}
            onClick={props.editPostButton}
          >
            edit
          </button> : 
          null }
        </td>
      </tr>
    )
  } else {
    return(
      <tr>
        <td><ForumAvatar user={props.post} handleUsernameClick={props.handleUsernameClick} /></td>
        <td>{props.post.text}</td>
        <td></td>
      </tr>
    )
  }
}

export default PostRow;