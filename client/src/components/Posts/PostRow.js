import React from "react";
import "./Posts.css";
import Authenticator from "../../utils/Authenticator";
var moment =require("moment");


const PostRow = (props) => {
  const authenticated = Authenticator.isAuthenticated;
  if(authenticated) {
    return(
      <tr>
        <td>
          <div className="placeholderUserComponent">
            {props.post.User.username}
          </div>
        </td>
        <td>
          <div className="postContent">
            <div className="postHeader">
              {moment(props.post.createdAt).format("lll")}
            </div>
            <div className="postBody">
              <div className="postText">
                {props.post.text}
              </div>
              <div className="postEditButton">
                {props.post.User.id === Authenticator.user.id ?
                  <button 
                    className="editButton" 
                    data-postid={props.post.id}
                    data-posttext={props.post.text}
                    onClick={props.editPostButton}
                  >
                    edit
                  </button> : 
                null }
              </div>
            </div>
            <hr />
            <div className="postBanner">
              {props.post.User.postBanner}
            </div>
          </div>
        </td>
      </tr>
    )
  } else {
    return(
      <tr>
        <td>
          <div className="placeholderUserComponent">
            {props.post.User.username}
          </div>
        </td>
        <td>{props.post.text}</td>
        <td></td>
      </tr>
    )
  }
}

export default PostRow;