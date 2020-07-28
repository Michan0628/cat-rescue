import React from "react";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Adoption from "./components/Adoption/Adoption";
import AdoptionDetail from "./components/AdoptionDetail/AdoptionDetail";
import NavMenu from "./components/NavMenu/NavMenu";
import Support from './components/Supoort/Supoort'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <NavMenu />

      <div className="App">
        <Switch>
          <Route path="/adoption/:id">
            <AdoptionDetail />
          </Route>

          <Route path="/adoption">
            <Adoption />
          </Route>

          <Route path="/support">
            <Support />
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
