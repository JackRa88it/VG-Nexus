import React from "react";
import "./Threads.css";
var moment =require("moment");

const ThreadRow = (props) => (
  <tr>
    <td className="tdThreadTitle">
        <p className="threadTitle"
          data-id={props.thread.id}
          data-name={props.thread.title}
          onClick={props.handleRowClick}
        >
          {props.thread.title}
        </p>
        <a href={"/profile/"+props.thread.User.id}><em className="threadAuthor linkable">{props.thread.User.username}</em></a>
        {/* <p className="threadAuthor">{props.thread.User.username}</p> */}
    </td>
    <td
      className="tdReplies"
    >
      {props.thread.Posts.length}
    </td>
    <td 
      className="tdLastPost"
      
    >
      {props.thread.Posts.length ? 
        <div>
          <p>{"by " + props.thread.Posts[0].User.username}</p>
          <p className="postTime">{moment(props.thread.Posts[0].updatedAt).format("ddd h:mma")}</p>
        </div> : 
        "(no posts)"}
    </td>
  </tr>
)

export default ThreadRow;