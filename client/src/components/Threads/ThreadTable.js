import React from "react";
import "./Threads.css";
import ThreadRow from "./ThreadRow";

class ThreadTable extends React.Component{
 
  render(){
    return (
      <table className="threadTable">
        <thead>
          <tr>
            <th>Forum</th>
            <th>Threads</th>
            <th>Recent</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forums.map(forum => {
            return(<ThreadRow forum={forum} />)
          })}
        </tbody>
      </table>
    )
  }
}

export default ThreadTable;