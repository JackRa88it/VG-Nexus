import React from "react";
import "./Threads.css";

const ThreadRow = (props) => (
  <tr>
    <td 
    className="threadTitle"
    data-id={props.thread.id}
    data-name={props.thread.title}
    onClick={props.handleRowClick}>
      {props.thread.title}
    </td>
    <td>{props.thread.Posts.length}</td>
    <td>{props.thread.Posts.length ? props.thread.Posts[0].text : "(no posts)"}</td>
  </tr>
)

export default ThreadRow;