import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API"
import Authenticator from '../../utils/Authenticator';
import "./Nav.css";

class NavTabs extends Component {
  state = {
    username: "Anonymous",
    user: undefined
  }
  logoutHandler = (event) => {
    event.preventDefault()
    Authenticator.signout()
    window.location.assign('/')
  }

  componentDidMount() {
    Authenticator.authenticate(() => {
      API.getUser(Authenticator.user.id)
      .then(user =>{
        this.setState({
          user: user.data,
          username: user.data.username
        })
      })
      .catch(err => {
        console.log(err)
      })
      
    })
  }
  render() {
    return (
      <nav className="p-0 mb-3 navbar navbar-expand-lg w-100">
        <ul className="nav nav-tabs ">
          <li className="nav-item">
            <Link to="/" >
              <img src="/assets/controller_logo_white_red_AB.png" alt="controllerLogo" id="controllerLogo" className="ml-2" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" >
              <img src="/assets/VG-NEXUS-logo_400x120.png" alt="VGNLogo" id="VGNLogo" className="mx-2" />
            </Link>
          </li>
        </ul>
        <ul className="nav nav-tabs navbar-collapse">
        {/* TODO: FIX BELOW */}
         
          <li className="nav-item">
          <Link
              to="/all"
              className={
                window.location.pathname === "/all"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Games
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
            <Link
              to="/community"
              className={
                window.location.pathname === "/community"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Community
          </Link>
          </li>
        </ul>
        {/* user */}
        <ul className="nav nav-tabs pr-2">
          <li className="nav-item">
            {!Authenticator.isAuthenticated ? (
              <div className='d-inline-flex'>
                <Link to="/login_signup" className="nav-link">Sign In</Link>
              </div>
            ) : (
                <div className="nav-item dropdown dropdownMenu">
                  <div className="nav-link special dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="image" src={"/assets/userThumbnails/" + this.state.user.id} />
                  </div>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    {/* your name should take you to your public profile */}
                    <Link className="dropdown-item" to={`/profile/${Authenticator.user.id}`}>{this.state.username}</Link>
                    <div className="dropdown-divider"></div>
                    {/* takes you to public profile, like how clicking on your name takes you there too */}
                    {/* it's there because it's more explicit than clicking on your name */}
                    <Link className="dropdown-item" to={`/profile/${Authenticator.user.id}`}>View Profile</Link>
                    <div className="dropdown-divider"></div>
                    {/* Your ... is where you can edit your stuff. Each one takes you to the same page. */}
                    {/* Your Profile */}
                    <Link className="dropdown-item" to="/UserNexus/EditProfile">Edit Profile</Link>
                    {/* Your Games */}
                    <Link className="dropdown-item" to="/UserNexus/Games">Your Games</Link>
                    {/* Your Posts */}
                    {/* If you click "Your Posts," you go to that tab on that page */}
                    <Link className="dropdown-item" to="/UserNexus/Posts">Your Posts</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/about">
                      Help
                    <i className="far fa-question-circle"></i>
                    </Link>
                    <div className="dropdown-item" href="#">
                      Settings
                  <i className="fas fa-wrench"></i>
                    </div>
                    {/* Log out button */}
                    <Link
                      to="/logout"
                      onClick={this.logoutHandler}>
                      <div className="dropdown-item">
                       Logout
                       <i className="fas fa-sign-out-alt"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
          </li>

        </ul>
      </nav>
    )
  };
}

export default NavTabs;