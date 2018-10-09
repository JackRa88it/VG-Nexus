import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

class Footer extends Component {

  render(){
      return (
      <div className="container-fluid footer bg-standard">
            {/* Float to the right */}
            
                 
                <div className="my-1 mx-auto developers">
                    <div className="float-left">
                        <a href="https://bootcamp.berkeley.edu/coding/">
                          <small>UC Berkeley Extension</small>
                        </a>
                      </div>
                    <div className="text-center">
                      <a href="https://github.com/AaronGoldsmith" className="git">
                        <small>Aaron</small>
                      </a>
                      &nbsp;&bull;&nbsp;	

                      <a href="https://github.com/vnguye51" className="git">
                      <small>Vincent</small>
                      </a>
                      &nbsp;&bull;&nbsp;	

                      <a href="https://github.com/JackRa88it" className="git">
                      <small>Jack</small>
                      </a>
                      &nbsp;&bull;&nbsp;

                      <a href="https://github.com/haffedali" className="git">
                      <small>Haffed</small>
                      </a>
                      &nbsp;&bull;&nbsp;	
                      
                      <a href="https://github.com/DinhDo2312" className="git">
                         <small>Dinh</small>
                      </a>

                      <div className="float-right">
                        <a href="https://bootcamp.berkeley.edu/coding/">
                          <small>Coding Bootcamp 2018</small>
                        </a>
                      </div>
                    </div>
                  
                    
                </div>
               
                
          </div>
      )
  };
}
export default Footer;
