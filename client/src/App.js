import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ChooseGame from "./components/pages/ChooseGame";
import {Container} from "./components/Grid";
const App = () => (
  <Router>
    <div>
      <NavTabs />
      <Container>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/all" component={ChooseGame} />
      </Container>
    </div>
  </Router>
);

export default App;

