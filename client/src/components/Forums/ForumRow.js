import React from "react";
import "./Forums.css";

const ForumRow = (props) => (
  <tr className="forumRow">
    <td 
    className="forumTitle"
    data-id={props.forum.id}
    onClick={props.handleRowClick}>
      {props.forum.title}
    </td>
    <td>{props.forum.Threads.length}</td>
    <td>{props.forum.Threads[0].title}</td>
  </tr>
)

export default ForumRow;