import React, {Component} from "react";
import { Link } from "react-router-dom";
import Authenticator from './Authenticate';
import logo from "../assets/controller_logo_white_red.png";

class NavTabs extends Component{
  state = {
    authenticated: false
  }
  logoutHandler=(event)=>{
    event.preventDefault()
    Authenticator.signout(()=>{
      this.setState({authenticated: false})
    })
  }

  componentDidMount(){
    Authenticator.authenticate(()=>{
      this.setState({authenticated: true})
    })
  }
  render(){
    return(
    <nav className="p-0 navbar navbar-expand-lg w-100">
    {/* separate elements in nav bar with margin */}
      <ul className="nav nav-tabs"> 
        <li className="nav-item">
         <Link to="/" >
            <img src={logo} alt="logo" id="logo"/>
          </Link>
        </li>
        </ul>
      <ul className="nav nav-tabs navbar-collapse"> 
        <li className="nav-item">
          <Link
            to="/"
            className={
              window.location.pathname === "/" ? "nav-link active" : "nav-link"
            }
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className={
              window.location.pathname === "/about" ? "nav-link active" : "nav-link"
            }
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/all"
            className={
              window.location.pathname === "/all"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Choose Game
          </Link>
      </li>
      <li className="nav-item">
          <Link
            to="/upload"
            className={
              window.location.pathname === "/upload"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Upload
          </Link>
      </li>
      </ul>
      <ul className="nav nav-tabs ml-1">
      <li className="nav-item">
        {!this.state.authenticated ? (
          <Link
            to="/login"
            className={
              window.location.pathname === "/login"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Login
          </Link>) : (
          <Link
            to="/logout"
            className={
              window.location.pathname === "/logout"
                ? "nav-link active"
                : "nav-link"
            }
            onClick = {this.logoutHandler}
          >
            Logout
          </Link>  
          )}
      </li>
      <li className="nav-item">
          <Link
            to="/signup"
            className={
              window.location.pathname === "/signup"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Sign Up
          </Link>
      </li>
      </ul>
    </nav>
  )};
}
  

export default NavTabs;
