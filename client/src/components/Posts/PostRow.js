import React from "react";
import "./Posts.css";
import Authenticator from "../../utils/Authenticator";

const PostRow = (props) => {
  const authenticated = Authenticator.isAuthenticated;
  if(authenticated) {
    return(
      <tr>
        <td>{props.post.User.username}</td>
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
        <td>{props.post.User.username}</td>
        <td>{props.post.text}</td>
        <td></td>
      </tr>
    )
  }
}

export default PostRow;