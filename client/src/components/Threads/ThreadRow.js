import React from "react";
import "./Threads.css";

const ThreadRow = (props) => (
  <tr>
    <td>{props.thread.title}</td>
    <td>{props.thread.Posts.length}</td>
    <td>{props.thread.Posts[0].text}</td>
  </tr>
)

export default ThreadRow;