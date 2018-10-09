import React from "react";
import "./Forums.css";
import ForumRow from "./ForumRow";

class ForumTable extends React.Component{
 
  render(){
    return (
      <table className="forumTable">
        <thead>
          <tr>
            <th>Forum</th>
            <th>Threads</th>
            <th>Recent</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forums.map(forum => {
            return(<ForumRow forum={forum} />)
          })}
        </tbody>
      </table>
    )
  }
}

export default ForumTable;