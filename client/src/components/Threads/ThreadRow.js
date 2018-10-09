import React from "react";
import "./Threads.css";

const ThreadRow = (props) => (
  <tr>
    <td>{props.forum.title}</td>
    <td>{props.forum.Threads.length}</td>
    <td>{props.forum.Threads[0].title}</td>
  </tr>
)

export default ThreadRow;