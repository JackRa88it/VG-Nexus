import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
class Tabs extends Component {



    render() {
        console.log(this.props)
        return (
            <div>
                <nav className="p-0 mb-3 navbar-expand-lg w-100">
                    <h1>NEXUS</h1>
                    <ul className="nav nav-tabs navbar-collapse">
                        <li className="nav-item">
                            <div
                                className={
                                    window.location.pathname === "/#"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                name = "location"
                                value = "Profile"
                                onClick={this.props.handleTabClick}
                            >
                                Customize Profile
                        </div>
                        </li>
                        <li className="nav-item">
                            <div 
                                className={
                                window.location.pathname === "/#"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                                name = "location"
                                value = "Game"
                                onClick={this.props.handleTabClick}>
                                Your Games
                            </div>
                        </li>
                        <li className="nav-item">
                            <div 
                                className={
                                window.location.pathname === "#"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                                name = "location"
                                value = "Posts"
                                onClick={this.props.handleTabClick}>
                                Your Posts
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

}
export default Tabs;