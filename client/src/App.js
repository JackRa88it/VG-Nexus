import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from'axios';
import Form from './components/UploadForm/Form'
import Game from './components/Game/Game'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import DirectMessage from './pages/Chat/DirectMessage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/upload" component={Form} />
        <Route exact path="/game" component={Game} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/chat' component={DirectMessage} />
      </div>
      </Router>

    );
  }
}

export default App;
