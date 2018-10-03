import React from "react";
import "./Comment.css";

import { Link } from "react-router-dom";
import { Row, Col } from "../Grid"

const Comment = () => (
  <div className="wrapper">
    <Row>
      <Col size="md-2">
            <Link to="#" role="button" className="btn btn-link username">USERNAME</Link>
        <img src='https://via.placeholder.com/60x60' alt='user_img' />
      </Col>
      <Col size="md-9">
        <div className="comment">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a pulvinar neque, at dapibus augue. Ut rhoncus congue turpis, sit amet fermentum quam molestie iaculis. Suspendisse condimentum mauris a diam tincidunt iaculis. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a pulvinar neque, at dapibus augue. Ut rhoncus congue turpis, sit amet fermentum quam molestie iaculis. Suspendisse condimentum mauris a diam tincidunt iaculis. 
        </div>
       </Col>
    </Row>
  </div>

);
export default Comment;