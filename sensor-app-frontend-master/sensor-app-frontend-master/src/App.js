import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './constants/Navbar'
import Breadcrumb from './components/layouts/Breadcrumbs';
import Footer from './components/layouts/Footer';
import Dashboard from './views/Dashboard'
import About from './views/About'


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div>
         
          <div>
            <Breadcrumb />
          </div>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/About">
              <About />
            </Route>
          </Switch>
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
