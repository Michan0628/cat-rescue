import React from "react";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile'
import Adoption from './components/Adoption/Adoption'
import Supoort from './components/Supoort/Supoort'
import Story from './components/Story/Story'
import AdoptionDetail from './components/AdoptionDetail/AdoptionDetail'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/adoption/:id">
            <Profile />
          </Route>


          <Route path="/adoption">
            <Adoption />
          </Route>

<Route path='/detail'>
  <AdoptionDetail/>
</Route>
          <Route path="/support">
            <Supoort />
          </Route>
          <Route path="/story">
            <Story />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
