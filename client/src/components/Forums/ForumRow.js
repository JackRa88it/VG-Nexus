import React from "react";
import "./Forums.css";

const ForumRow = (props) => (
  <tr>
    <td>{props.forum.title}</td>
    <td>{Math.floor(Math.random() * 100 + 1)}</td>
    <td>Blah Blah Blah</td>
  </tr>
)

export default ForumRow;