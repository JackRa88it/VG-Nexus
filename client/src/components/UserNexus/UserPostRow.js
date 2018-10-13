import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Authenticator from '../../utils/Authenticator';
const UserPostRow = (props) => {
        return(
        <div>
        {props.post.text}
        ORA O ROA
        </div>
        )

}
export default UserPostRow;