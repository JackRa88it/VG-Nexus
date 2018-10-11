import React from "react";
import "./Posts.css";

const PostRow = (props) => (
  <tr>
    <td>{props.post.User.username}</td>
    <td>{props.post.text}</td>
  </tr>
)

export default PostRow;