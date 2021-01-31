import React from 'react';
import TopNav from "./TopNav";
import {
    //Navbar
} from "shards-react";
import "./css/utilities.css"
import "./css/grid.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SpecificHeat from "./calculators/chemistry/SpecificHeat";
function App() {

  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <TopNav></TopNav>
          <Switch>
              <Route path="/calculators/specific-heat">
                  <SpecificHeat/>
              </Route>
              <Route path="users">
                  {/*<About/>*/}
              </Route>
              <Route path="/">
                  {/*<About/>*/}
              </Route>
          </Switch>
      </Router>

      </header>
    </div>
  );
}

export default App;
