import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

export const Footer = ({ fluid }) => (
  <div className={`container${fluid ? "-fluid" : ""}`}>
    <div class="container-fluid">
      <span class="tiny mb-1 float-right mx-3 ">
        <Link to="https://bootcamp.berkeley.edu/coding/">
            UC Berkeley Extension <br />
            Coding Bootcamp 2018
        </Link>
        </span>
      <div class="conainter footer m-1">
          <small class="float-left mx-2 text-white">Group 3 </small>
          <div class="text-center mt-2 mb-1">
              <a href="https://github.com/AaronGoldsmith" class="text-light">Aaron</a>
              &nbsp;|
              <a href="https://github.com/vnguye51" class="text-light">Vincent</a>
              &nbsp;|
              <a href="https://github.com/JackRa88it" class="text-light">Jack</a>
              &nbsp;|
              <a href="https://github.com/haffedali" class="text-light">Haffed</a>
              &nbsp;|
              <a href="https://github.com/DinhDo2312" class="text-light">Dinh</a>
          </div>
      </div>
    </div>
    </div>
);

