import React from "react";
import "./Comment.css";

import { Link } from "react-router-dom";
import { Row, Col } from "../Grid"


const Comment = (props) => (
  <div className={"wrapper pattern"+ props.pattern} >
    <div className='userThumbnail'>
      <img src={'/assets/userThumbnails/' + props.userId} alt='user_img' />
    </div>
    <div className='commentInfo'>
      <Link to={'/user/' + props.userId} ><div className='username'>{props.name}</div></Link>
      <div className = 'date'>Oct 17, 2010</div>
    </div>
    <div className="comment">
      {props.children}
    </div>
    <div className="score">
      <div>{props.score}</div>
      <div>
        <div className ='upvote'>+</div><div className = 'downvote'>&minus;</div>
      </div>
    </div>
  </div>

);
export default Comment;