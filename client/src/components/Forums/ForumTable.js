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
            <th>Recent Activity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forums.map(forum => {
            return(
              <ForumRow 
                key={forum.id}
                forum={forum} 
                handleRowClick={this.props.handleRowClick}
              />
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default ForumTable;