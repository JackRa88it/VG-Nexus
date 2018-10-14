import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
class Tabs extends Component {



    render() {
        // console.log(this.props)
        // onClick={this.props.handleTabClick}
        return (
            <div>
                <nav className="p-0 mb-3 navbar-expand-lg w-100">
                    <ul className="nav nav-tabs navbar-collapse">
                        <li className="nav-item">
                            <Link
                                className={
                                    window.location.pathname === "/#"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                to = "/UserNexus/EditProfile"
                                name = "location"
                                value = "EditProfile"
                            >
                                Edit Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={
                                window.location.pathname === "/#"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to = "/UserNexus/Games"
                                name = "location"
                                value = "Games"
                            >
                                Your Games
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={
                                window.location.pathname === "#"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to = "/UserNexus/Posts"
                                name = "location"
                                value = "Posts"
                            >
                                Your Posts
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

}
export default Tabs;