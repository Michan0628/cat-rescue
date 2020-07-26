import React from "react";
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile'
import Adoption from './components/Adoption/Adoption'
import Supoort from './components/Supoort/Supoort'
import Story from './components/Story/Story'
import AdoptionDetail from './components/AdoptionDetail/AdoptionDetail'
import NavMenu from './components/NavMenu/NavMenu'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
<NavMenu />


      <div className="App">
        <Switch>
          <Route path="/adoption/:id">
            <Profile />
          </Route>

        <Route path='/menupage'>
          <NavMenu />
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
      <Footer />
    </Router>
  );
}

export default App;
