import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

class Footer extends Component {

  render(){
      return (
      <div className="container-fluid footer bg-standard">
            {/* Float to the right */}
            <div className="tiny mb-1 float-right ml-3 ">
              <Link to="https://bootcamp.berkeley.edu/coding/">
                 <small>Copyright 2018 &copy;</small>
              </Link>
              </div>
            <div class="conainter m-1">
                <div className="text-center mt-2 mb-1">
                  <small className="float-left text-white">Group 3 - UCB Extension Bootcamp </small>

                    <a href="https://github.com/AaronGoldsmith" className="text-light">
                      <small>Aaron</small></a>
                    &nbsp;&bull;&nbsp;	

                    <a href="https://github.com/vnguye51" className="text-light">
                    <small>Vincent</small></a>
                    &nbsp;&bull;&nbsp;	

                    <a href="https://github.com/JackRa88it" className="text-light">
                    <small>Jack</small></a>
                    &nbsp;&bull;&nbsp;

                    <a href="https://github.com/haffedali" className="text-light">
                    <small>Haffed</small></a>
                    &nbsp;&bull;&nbsp;	
                    
                    <a href="https://github.com/DinhDo2312" className="text-light">
                    <small>Dinh</small></a>
                </div>
            </div>
          </div>
      )
  };
}
export default Footer;
