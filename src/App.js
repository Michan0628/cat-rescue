import React from 'react';
import Home from './components/Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';

function App() {
  return (
    <Router>
    <div className="App">
     
     <Switch>
       {/* <Route path='/about'>
      <About />
       </Route>

       <Route path='/support'>
      <Supoort />
       </Route>

       <Route path='/adoption/:id'>
      <Profile />
       </Route>

       <Route path='/adoption'>
      <Adoption />
       </Route>

       <Route path='/story'>
      <About />
       </Route> */}


       <Route path='/'>
      <Home />
       </Route>

     </Switch>


    </div>
    </Router>
  );
}

export default App;
