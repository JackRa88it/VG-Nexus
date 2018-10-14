import React, { Component } from 'react';
import "./Posts.css";
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Authenticator from '../../utils/Authenticator';
var moment = require("moment");

const UserPostRow = (props) => {
        return (
                <div className="postBody pattern0">
                                <div className="postText">
                                {props.post.text}
                                <hr></hr>
                                {moment(props.post.createdAt).format("lll")}
                                <button
                                        className="editButton"
                                        data-postid={props.post.id}
                                        data-posttext={props.post.text}
                                        onClick={props.editPostButton}
                                >
                                        delete
                                </button>
                        </div>
                </div>
        )

}
export default UserPostRow;