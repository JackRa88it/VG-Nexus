import React from "react";
import "./CommentList.css";
// import {Col,Row} from "../Grid"
import Comment from "../Comment"
class CommentList extends React.Component{
 
  render(){
    return (
      <div className="skinny">
        <h3>Comments</h3>
        <div className="border">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />

        </div>
      </div>
  )}
}

export default CommentList;