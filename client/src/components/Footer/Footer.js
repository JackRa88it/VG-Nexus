import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="container-fluid footer bg-standard">
      <div className="d-flex w-100 flex-row">
        <div id="left" className='d-inline-flex w-25 py-2'>
              <Link to="/about">
                How to use
              </Link>
            
              <a className="px-4" href="https://github.com/JackRa88it/VG-Nexus/blob/master/LICENSE" target="_blank">Copyright &nbsp;&copy;&nbsp; 2018 </a>
              <a href="https://github.com/JackRa88it/VG-Nexus/blob/master/CODE_OF_CONDUCT.md" target="_blank">Code of Conduct</a>
        </div>
        <div className="devTeam" id="middle">
            <a href="https://github.com/AaronGoldsmith" className="git">
              Aaron
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://github.com/vnguye51" className="git">
              Vincent
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://github.com/JackRa88it" className="git">
              Jack
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://github.com/haffedali" className="git">
              Haffed
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://github.com/DinhDo2312" className="git">
              Dinh
            </a>
        </div>
       
        <div className="d-flex w-100 pt-1 justify-content-end">
            <a href="https://bootcamp.berkeley.edu/coding/">
              UC Berkeley Extension <br />
              Coding Bootcamp 2018
            </a>
          </div>
      </div>
      </div>

    );
  }
}
export default Footer;
