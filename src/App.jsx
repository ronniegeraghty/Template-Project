import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import Blank from "./components/Blank/Blank";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Blank" component={Blank} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
