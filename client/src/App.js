import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from'axios';
import Form from './components/UploadForm/Form'
import Game from './components/Game/Game'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/upload" component={Form} />
        <Route exact path="/game" component={Game} />
      </div>
      </Router>

    );
  }
}

export default App;
