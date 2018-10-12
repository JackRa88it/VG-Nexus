import React from "react";
import "./Forums.css";



const ForumRow = (props) => (
  <tr className="forumRow">
    <td className="tdForumTitle">
      <p className="forumTitle"
          data-id={props.forum.id}
          data-name={props.forum.title}
          onClick={props.handleRowClick}
        >
          {props.forum.title}
        </p>
        <p className="forumDescription">{props.forum.description}</p>
    </td>
    <td>{props.forum.Threads.length}</td>
    <td>{props.forum.Threads.length ? props.forum.Threads[0].title : "(no threads)"}</td>
  </tr>
)

export default ForumRow;