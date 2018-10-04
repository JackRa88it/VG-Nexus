import React, {Component} from "react";
import { Link } from "react-router-dom";
import Authenticator from './Authenticate'

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
    <ul className="nav nav-tabs">
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
    </ul>
  )};
}
  

export default NavTabs;
