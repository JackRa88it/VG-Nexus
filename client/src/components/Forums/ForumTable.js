import React from "react";
import "./Forums.css";
import ForumRow from "./ForumRow";

class ForumTable extends React.Component{
 
  render(){
    return (
      <table className="forumTable">
        <tr>
          <th>Forum</th>
          <th>Threads</th>
          <th>Recent</th>
        </tr>
        {this.props.forums.map(forum => {
          return(<ForumRow forum={forum} />)
        })}
      </table>
    )
  }
}

export default ForumTable;